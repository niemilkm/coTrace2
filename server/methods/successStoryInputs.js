Meteor.methods({
  'SuccessStoryInputs.insert': function (params) {
    //check(params, {ques: String, num: Number});
    companyId = "AEXNrTCL52oDFcDmi";
    if (SuccessStoryInputs.find({company: companyId}))
    {
      params.index = getIndexNumber(companyId);
      SuccessStoryInputs.update({company: companyId}, {$push: {SSInputs: params}});
    }
    else
    {
      params.index = 1;
      var insertParams = {company: companyId, SSInputs: params};
      SuccessStoryInputs.insert(insertParams)
    }

  },

  'SuccessStoryInputs.update': function (params, quesNumChange) {
    //check(params, {name: String});
    //check(id, String);
    var companyId = "AEXNrTCL52oDFcDmi";
    var allowed;
    if (quesNumChange)
      allowed = checkValidQuesNumber(companyId, params.num);
    else
      allowed = true;

    if (!allowed)
    {
      return -2;
    }
    else
    {
      console.log(params.index);
      SuccessStoryInputs.update({company: companyId, 'SSInputs.index': params.index}, {$set: {'SSInputs.$': params}});
      return 1;
    }
    return -1;
  },

  'SuccessStoryInputs.remove': function(params) {
    if (typeof params === "string")
    {
      check(params, String);
      SuccessStoryInputs.remove(params);
    }
    else
    {
      check(params, Match.Where(function(params){
        _.each(params, function (data) {
          /* do your checks and return false if there is a problem */
          if (typeof data != "String")
            return false;
        });
        // return true if there is no problem
        return true;
      }));
      SuccessStoryInputs.remove({_id: {$in: params}});
    }
  }
});

getIndexNumber = function(companyId)
{
  var indexNumbers = SuccessStoryInputs.findOne({company: companyId}, {fields: {"SSInputs.index": 1}});
  var currentIndexNumbers = _.map(indexNumbers.SSInputs, function(data) {return data.index;});
  var currentIndexNumbers_sorted = _.sortBy(currentIndexNumbers);
  for (var i=1; i<=currentIndexNumbers_sorted.length; i++)
  {
    if (i != currentIndexNumbers_sorted[i-1])
    {
      return i;
    }
  }
  return i;
}

checkValidQuesNumber = function(companyId, quesNum, indexNum)
{
  var quesNumbers = SuccessStoryInputs.findOne({company: companyId}, {fields: {"SSInputs": 1}});
  var currentQuesNumbers = _.map(quesNumbers.SSInputs, function(data) {return data.num;});
  return !_.contains(currentQuesNumbers, Number(quesNum));
}
