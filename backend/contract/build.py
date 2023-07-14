from pathlib import Path
from go_insure import go_insure_app


def build() -> Path:
    app_spec = go_insure_app.build()
    output_dir = Path(__file__).parent / "artifacts"
    print(f"Dumping {app_spec.contract.name} to {output_dir}")
    app_spec.export(output_dir)
    return output_dir / "application.json"