from argparse import ArgumentParser
import subprocess
import os
import shutil
import zipfile

addon_name = "Better Netflix"
dir_path = os.path.dirname(os.path.realpath(__file__))
firefox_dir = f"{dir_path}/dist-firefox"
chrome_dir = f"{dir_path}/dist-chrome"


def main():
    args = parse_args()
    run_webpack()
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
    return parser.parse_args()


def run_webpack():
    process = subprocess.run(
        [
            "npx",
            "webpack",
            "--entry",
            f"{dir_path}/build/Main.js",
            "--output",
            f"{firefox_dir}/Main.js",
            "--mode",
            "none",
        ]
    )
    process.check_returncode()
    print("Successfully created JavaScript code")


def build_firefox():
    replace_dir(f"{dir_path}/src/options", f"{firefox_dir}/options")
    shutil.copy(f"{dir_path}/src/style.css", firefox_dir)
    shutil.copyfile(
        f"{dir_path}/bn-cadmium-playercore-firefox.js",
        f"{firefox_dir}/resources/bn-cadmium-playercore.js",
    )
    shutil.copy(f"{dir_path}/src/background.js", firefox_dir)
    print(f"\nSuccessfully built {addon_name} for Firefox")


def build_chrome():
    shutil.copy(f"{firefox_dir}/Main.js", chrome_dir)
    replace_dir(f"{dir_path}/src/options", f"{chrome_dir}/options")
    shutil.copy(f"{dir_path}/src/style.css", chrome_dir)
    shutil.copyfile(
        f"{dir_path}/bn-cadmium-playercore-chrome.js",
        f"{chrome_dir}/resources/bn-cadmium-playercore.js",
    )
    shutil.copy(f"{dir_path}/src/background.js", chrome_dir)
    print(f"\nSuccessfully built {addon_name} for Chrome")


def zip_addon():
    shutil.make_archive("better-netflix-firefox", "zip", firefox_dir)
    shutil.make_archive("better-netflix-chrome", "zip", chrome_dir)
    create_source_code_zip()
    print(
        "\nSuccessfully created zip files for Firefox and Chrome and created the source code package for Firefox needed for the source code submission policy"
    )


def create_source_code_zip():
    dirs = ["./build", "./dist-firefox", "./src"]
    file_names = ["build.py", "README"]
    with zipfile.ZipFile("source-code.zip", "w", zipfile.ZIP_DEFLATED) as zip_file:
        for filename in file_names:
            zip_file.write(os.path.join(dir_path, filename), arcname=filename)
        for folder in dirs:
            for root, folders, files in os.walk(folder):
                for file in files:
                    cur_file = os.path.join(root, file)
                    zip_file.write(os.path.abspath(cur_file), arcname=cur_file)


def replace_dir(new: str, old: str):
    if os.path.exists(old):
        shutil.rmtree(old)
    shutil.copytree(new, old)


if __name__ == "__main__":
    main()