function createSuccess(data) {
  return { data: data };
}

function createError(error) {
  return { error: error };
}

module.exports = { createError, createSuccess };
