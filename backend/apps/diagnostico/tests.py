import io
from PIL import Image
from rest_framework.test import APITestCase


class DiagnosticoViewTests(APITestCase):
	def test_missing_models_returns_json_error(self):
		"""If required model files are missing, the API should return JSON with an 'error' key and status 500."""
		# Create a minimal in-memory JPEG image
		img = Image.new("RGB", (10, 10), color=(255, 0, 0))
		buf = io.BytesIO()
		img.save(buf, format="JPEG")
		buf.seek(0)

		resp = self.client.post("/api/diagnosticar/", {"imagen": buf}, format="multipart")
		self.assertEqual(resp.status_code, 500)
		self.assertIn("error", resp.data)
