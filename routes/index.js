
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Congo: The Mongo Editor' });
};

exports.tongo = function(req, res){
  res.render('tongo', { title: 'Tongo: The TDDed Mongo Editor' });
};
