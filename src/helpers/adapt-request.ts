export default function adaptRequest(req: any) {
  return Object.freeze({
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    headers: req.headers,
    body: req.body,
    files: req.files,
    existingFiles: req.existingFiles,
  });
}
