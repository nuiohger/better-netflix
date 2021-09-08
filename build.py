#!./venv/bin/python3

from argparse import ArgumentParser
import subprocess
import os
import shutil
import zipfile
from distutils import dir_util

addon_name = "Better Netflix"
base_dir = os.path.dirname(os.path.realpath(__file__))
build_dir = f"{base_dir}/build"
firefox_dir = f"{build_dir}/dist-firefox"
chrome_dir = f"{build_dir}/dist-chrome"


def main():
    args = parse_args()
    if args.review_build:
        review_build()
        return

    if args.typescript:
        build_typescript()
    run_webpack(firefox_dir)
    build_firefox()
    build_chrome()
    if args.zip:
        zip_addon()


def parse_args():
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
    return parser.parse_args()


def build_typescript():
    run_subprocess(
        "tsc",
        "--build",
        f"{base_dir}/tsconfig.json",
        success_msg="Successfully built typescript\n",
    )


def run_webpack(destination_dir: str):
    run_subprocess(
        "npx",
        "webpack",
        "--entry",
        f"{base_dir}/build/Main.js",
        "--output-path",
        f"{destination_dir}",
        "--mode",
        "none",
        success_msg="Successfully created JavaScript code",
    )


def run_subprocess(*args, success_msg=""):
    process = subprocess.run(list(args))
    process.check_returncode()
    if success_msg != "":
        print(success_msg)


def build_firefox():
    replace_dir(f"{base_dir}/src/options", f"{firefox_dir}/options")
    shutil.copy(f"{base_dir}/src/style.css", firefox_dir)
    os.makedirs(f"{firefox_dir}/resources", exist_ok=True)
    dir_util.copy_tree(f"{base_dir}/dist/firefox", firefox_dir)
    print(f"\nSuccessfully built {addon_name} for Firefox")


def build_chrome():
    os.makedirs(f"{chrome_dir}/options", exist_ok=True)
    shutil.copy(f"{firefox_dir}/main.js", chrome_dir)
    replace_dir(f"{base_dir}/src/options", f"{chrome_dir}/options")
    shutil.copy(f"{base_dir}/src/style.css", chrome_dir)
    os.makedirs(f"{chrome_dir}/resources", exist_ok=True)
    dir_util.copy_tree(f"{base_dir}/dist/chrome", chrome_dir)
    print(f"\nSuccessfully built {addon_name} for Chrome")


def zip_addon():
    shutil.make_archive("build/better-netflix-firefox", "zip", firefox_dir)
    shutil.make_archive("build/better-netflix-chrome", "zip", chrome_dir)
    create_source_code_zip()
    print(
        "\nSuccessfully created zip files for Firefox and Chrome and created the source code package for Firefox needed for the source code submission policy"
    )


def create_source_code_zip():
    dirs = ["./build", "./dist-firefox", "./src"]
    ignored_file_extensions = ["zip"]
    ignored_dirs = ["dist-firefox", "dist-chrome"]
    file_names = ["build.py", "README", "tsconfig.json"]

    with zipfile.ZipFile(
        "build/source-code.zip", "w", zipfile.ZIP_DEFLATED
    ) as zip_file:
        for filename in file_names:
            zip_file.write(os.path.join(base_dir, filename), arcname=filename)

        for folder in dirs:
            for root, folders, files in os.walk(folder):
                if any(ignored in root for ignored in ignored_dirs):
                    continue

                for file in files:
                    if any(
                        file.endswith(ignored) for ignored in ignored_file_extensions
                    ):
                        continue

                    cur_file = os.path.join(root, file)
                    zip_file.write(os.path.abspath(cur_file), arcname=cur_file)


def replace_dir(new: str, old: str):
    if os.path.exists(old):
        shutil.rmtree(old)
    shutil.copytree(new, old)


def review_build():
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
