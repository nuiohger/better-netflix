from publish.utils import run_subprocess


SRC_FOLDER = "src"


def formatting() -> None:
    run_subprocess(
        "npx",
        "prettier",
        "--check",
        SRC_FOLDER,
    )


def code_analysis() -> None:
    run_subprocess(
        "npx", "eslint", SRC_FOLDER, success_msg="Code analysis check was successful"
    )


def all_checks() -> None:
    formatting()
    code_analysis()
