#!/usr/bin/env python3

import os
import shutil
import zipfile
from argparse import ArgumentParser, Namespace
from distutils import dir_util

from publish.checks import all_checks
from publish.publish import update_version
from publish.utils import run_subprocess

ADDON_NAME = "Better Netflix"
BASE_DIR = os.path.dirname(os.path.realpath(__file__))
BUILD_DIR = f"{BASE_DIR}/build"
FIREFOX_DIR = f"{BUILD_DIR}/dist-firefox"
CHROME_DIR = f"{BUILD_DIR}/dist-chrome"


def main() -> None:
    args = parse_args()
    if args.review_build:
        review_build()
        return

    if args.checks:
        all_checks()
        return

    if args.publish:
        all_checks()

    if args.typescript or args.publish:
        build_typescript()

    run_webpack(FIREFOX_DIR)
    build_firefox()
    build_chrome()

    if args.zip or args.publish:
        zip_addon()

    if args.publish:
        update_version()


def parse_args() -> Namespace:
    parser = ArgumentParser()
    parser.add_argument(
        "-z",
        "--zip",
        action="store_true",
        help="create zip files for Add-on publishing",
    )
    parser.add_argument(
        "-t", "--typescript", action="store_true", help="build typescript"
    )
    parser.add_argument(
        "-rb",
        "--review-build",
        action="store_true",
        help="build the Add-on for reviewers",
    )
    parser.add_argument(
        "-c",
        "--checks",
        action="store_true",
        help="check formatting and run code analysis",
    )
    parser.add_argument(
        "-p",
        "--publish",
        action="store_true",
        help="publish a new version: updates the version number, creates a git tag and a gitlab release, updates changelogs and builds and zips the addon",
    )
    return parser.parse_args()


def build_typescript() -> None:
    run_subprocess(
        "tsc",
        "--build",
        f"{BASE_DIR}/tsconfig.json",
        success_msg="Successfully built typescript\n",
    )


def run_webpack(destination_dir: str) -> None:
    run_subprocess(
        "npx",
        "webpack",
        "--entry",
        f"{BASE_DIR}/build/Main.js",
        "--output-path",
        f"{destination_dir}",
        "--mode",
        "none",
        success_msg="Successfully created JavaScript code",
    )


def build_firefox() -> None:
    replace_dir(f"{BASE_DIR}/src/options", f"{FIREFOX_DIR}/options")
    shutil.copy(f"{BASE_DIR}/src/style.css", FIREFOX_DIR)
    os.makedirs(f"{FIREFOX_DIR}/resources", exist_ok=True)
    dir_util.copy_tree(f"{BASE_DIR}/dist/firefox", FIREFOX_DIR)
    print(f"\nSuccessfully built {ADDON_NAME} for Firefox")


def build_chrome() -> None:
    os.makedirs(f"{CHROME_DIR}/options", exist_ok=True)
    shutil.copy(f"{FIREFOX_DIR}/main.js", CHROME_DIR)
    replace_dir(f"{BASE_DIR}/src/options", f"{CHROME_DIR}/options")
    shutil.copy(f"{BASE_DIR}/src/style.css", CHROME_DIR)
    os.makedirs(f"{CHROME_DIR}/resources", exist_ok=True)
    dir_util.copy_tree(f"{BASE_DIR}/dist/chrome", CHROME_DIR)
    print(f"\nSuccessfully built {ADDON_NAME} for Chrome")


def zip_addon() -> None:
    shutil.make_archive("build/better-netflix-firefox", "zip", FIREFOX_DIR)
    shutil.make_archive("build/better-netflix-chrome", "zip", CHROME_DIR)
    create_source_code_zip()
    print(
        "\nSuccessfully created zip files for Firefox and Chrome and created the source code package for Firefox needed for the source code submission policy"
    )


def create_source_code_zip() -> None:
    dirs = ["./build", "./dist-firefox", "./src"]
    ignored_file_extensions = ["zip"]
    ignored_dirs = ["dist-firefox", "dist-chrome"]
    file_names = ["build.py", "README", "tsconfig.json"]

    with zipfile.ZipFile(
        "build/source-code.zip", "w", zipfile.ZIP_DEFLATED
    ) as zip_file:
        for filename in file_names:
            zip_file.write(os.path.join(BASE_DIR, filename), arcname=filename)

        for folder in dirs:
            for root, _, files in os.walk(folder):
                if any(ignored in root for ignored in ignored_dirs):
                    continue

                for file in files:
                    if any(
                        file.endswith(ignored) for ignored in ignored_file_extensions
                    ):
                        continue

                    cur_file = os.path.join(root, file)
                    zip_file.write(os.path.abspath(cur_file), arcname=cur_file)


def replace_dir(new: str, old: str) -> None:
    if os.path.exists(old):
        shutil.rmtree(old)
    shutil.copytree(new, old)


def review_build() -> None:
    print(
        "Building TypeScript. tsc is generating a JavaScript file for each TypeScript file..."
    )
    build_typescript()
    print(
        "Generated JavaScript files in build directory.\nThe JavaScript files are merged into one JavaScript file by webpack.\n"
    )
    run_webpack(".")
    print("\nThe merged JavaScript file is 'main.js' in the current directory.")


if __name__ == "__main__":
    main()
