
Successes = new Mongo.Collection(null);

throwSuccessAlert = function(message) {
  Successes.insert({message: message});
};

Template.successAlert.helpers({
  successes: function() {
    return Successes.find();
  }
});
