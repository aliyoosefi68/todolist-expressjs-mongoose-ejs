function NotFound(req, res, next) {
  return res.status(404).json({
    statusCode: res.status,
    error: {
      type: "NoteFound",
      message: "note found your request",
    },
  });
}

function ErrorHandler(err, req, res, next) {
  return res.json({
    statusCode: err.status || 500,
    error: {
      message: err.message || "Internal server Error",
    },
  });
}

module.exports = {
  NotFound,
  ErrorHandler,
};
