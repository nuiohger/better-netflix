import os

from gitlab.client import Gitlab

from .config import CONFIG


def create_release(name: str) -> None:
    gitlab = Gitlab.from_config("gitlab", ["python-gitlab.cfg"])
    project = gitlab.projects.get("konstantin-mueller/better-netflix")

    description = f"{_upload_file(CONFIG.paths.zip_firefox, project)}<br>\n{_upload_file(CONFIG.paths.zip_chrome, project)}\n\n# Changelog\n\n"

    print("What changed with this release? (One changelog item per line)")
    while len(item := input()):
        description += f"- {item}\n"

    last_commit = project.commits.list()[0]
    project.releases.create(
        {
            "name": name,
            "tag_name": name,
            "description": description,
            "ref": last_commit.id,
        }
    )


def _upload_file(filepath: str, project) -> str:
    uploaded_file = project.upload(os.path.split(filepath)[1], filepath=filepath)
    return uploaded_file["markdown"]


if __name__ == "__main__":
    create_release("testname")
