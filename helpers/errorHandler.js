const wrapper = fn => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (error) {
    switch (error.name) {
      case 'ValidationError':
        res
          .status(400)
          .json({ status: 'fail', code: 400, message: error.message });
        break;
      case 'CustomError':
        res
          .status(400)
          .json({ status: 'fail', code: 400, message: error.message });
        break;

      default:
        next(error);
        break;
    }
  }
};

module.exports = wrapper;
