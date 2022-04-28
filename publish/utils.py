import subprocess
import sys


def run_subprocess(*args: str, success_msg: str = "") -> None:
    try:
        print(" ".join(list(args)))
        subprocess.run(list(args), check=True, shell=True)
    except subprocess.CalledProcessError:
        print(
            f"An error occurred while executing the following command: '{' '.join(args)}'"
        )
        sys.exit(1)

    if success_msg != "":
        print(success_msg)
