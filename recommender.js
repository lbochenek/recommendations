var users1 = {
  "Angelica": {"Blues Traveler": 3.5, "Broken Bells": 2.0, "Norah Jones": 4.5, "Phoenix": 5.0, "Slightly Stoopid": 1.5, "The Strokes": 2.5, "Vampire Weekend": 2.0},
  "Bill":{"Blues Traveler": 2.0, "Broken Bells": 3.5, "Deadmau5": 4.0, "Phoenix": 2.0, "Slightly Stoopid": 3.5, "Vampire Weekend": 3.0},
  "Chan": {"Blues Traveler": 5.0, "Broken Bells": 1.0, "Deadmau5": 1.0, "Norah Jones": 3.0, "Phoenix": 5, "Slightly Stoopid": 1.0},
  "Dan": {"Blues Traveler": 3.0, "Broken Bells": 4.0, "Deadmau5": 4.5, "Phoenix": 3.0, "Slightly Stoopid": 4.5, "The Strokes": 4.0, "Vampire Weekend": 2.0},
  "Hailey": {"Broken Bells": 4.0, "Deadmau5": 1.0, "Norah Jones": 4.0, "The Strokes": 4.0, "Vampire Weekend": 1.0},
  "Jordyn":  {"Broken Bells": 4.5, "Deadmau5": 4.0, "Norah Jones": 5.0, "Phoenix": 5.0, "Slightly Stoopid": 4.5, "The Strokes": 4.0, "Vampire Weekend": 4.0},
  "Sam": {"Blues Traveler": 5.0, "Broken Bells": 2.0, "Norah Jones": 3.0, "Phoenix": 5.0, "Slightly Stoopid": 4.0, "The Strokes": 5.0},
  "Veronica": {"Blues Traveler": 3.0, "Norah Jones": 5.0, "Phoenix": 4.0, "Slightly Stoopid": 2.5, "The Strokes": 3.0}
};

var users2 = {
  "Amy": {"Taylor Swift": 4, "PSY": 3, "Whitney Houston": 4},
  "Ben": {"Taylor Swift": 5, "PSY": 2},
  "Clara": {"PSY": 3.5, "Whitney Houston": 4},
  "Daisy": {"Taylor Swift": 5, "Whitney Houston": 3}
}

var users3 = {
  "David": {"Imagine Dragons": 3, "Daft Punk": 5, "Lorde": 4, "Fall Out Boy": 1},
  "Matt": {"Imagine Dragons": 3, "Daft Punk": 4, "Lorde": 4, "Fall Out Boy": 1},
  "Ben": {"Kacey Musgraves": 4, "Imagine Dragons": 3, "Lorde": 3, "Fall Out Boy": 1},
  "Chris": {"Kacey Musgraves": 4, "Imagine Dragons": 4, "Daft Punk": 4, "Lorde": 3, "Fall Out Boy": 1},
  "Tori": {"Kacey Musgraves": 5, "Imagine Dragons": 4, "Daft Punk": 5, "Fall Out Boy": 3}
};

music = {
  "Dr Dog/Fate": {"piano": 2.5, "vocals": 4, "beat": 3.5, "blues": 3, "guitar": 5, "backup vocals": 4, "rap": 1},
  "Phoenix/Lisztomania": {"piano": 2, "vocals": 5, "beat": 5, "blues": 3, "guitar": 2,"backup vocals": 1, "rap": 1},
  "Heartless Bastards/Out at Sea": {"piano": 1, "vocals": 5, "beat": 4, "blues": 2, "guitar":4, "backup vocals": 1, "rap": 1},
  "Todd Snider/Don't Tempt Me": {"piano": 4, "vocals": 5, "beat": 4, "blues": 4, "guitar":1, "backup vocals": 5, "rap": 1},
  "The Black Keys/Magic Potion":{"piano": 1, "vocals": 4, "beat": 5, "blues": 3.5, "guitar":5, "backup vocals": 1, "rap": 1},
  "Glee Cast/Jessie's Girl": {"piano": 1, "vocals": 5, "beat": 3.5, "blues": 3, "guitar":4, "backup vocals": 5, "rap": 1},
  "La Roux/Bulletproof": {"piano": 5, "vocals": 5, "beat": 4, "blues": 2, "guitar": 1, "backup vocals": 1, "rap": 1},
  "Mike Posner": {"piano": 2.5, "vocals": 4, "beat": 4, "blues": 1, "guitar": 1, "backup vocals": 1,"rap": 1},
  "Black Eyed Peas/Rock That Body": {"piano": 2, "vocals": 5, "beat": 5, "blues": 1, "guitar":2, "backup vocals": 2, "rap": 4},
  "Lady Gaga/Alejandro": {"piano": 1, "vocals": 5, "beat": 3, "blues": 2, "guitar": 1, "backup vocals": 2, "rap": 1}
};


function pearson(person1, person2){
  var numInCommon = 0;
  var xy = 0;
  var xSum = 0;
  var ySum = 0;
  var xSumSq = 0;
  var ySumSq = 0;
  var x = 0;
  var y = 0;

  for(key in person1){
    if(person1.hasOwnProperty(key)){
      if((key in person2)&&(person2.hasOwnProperty(key))){
        numInCommon++;
        x = Number(person1[key]);
        y = Number(person2[key]);
        xy += x*y;
        xSum += x;
        ySum += y;
        xSumSq += Math.pow(x, 2);
        ySumSq += Math.pow(y, 2);
      }
    }
  }

  var numerator = xy - ((xSum*ySum)/numInCommon);
  var denominator = Math.sqrt(xSumSq - ((Math.pow(xSum, 2))/numInCommon))*Math.sqrt(ySumSq - ((Math.pow(ySum, 2))/numInCommon));

  if(denominator == 0)
    return 0;

  var res = numerator/denominator;
  if(isNaN(res)){
    return 0;
  }

  return res;
}

function minkowski(person1, person2, r){
  if(!r){
    r = 1; //manhattan
  }
  var distance = 0;
  var commonRatings = false;
  for(key in person1){
    if(person1.hasOwnProperty(key)){
      if(key in person2){
        distance += Math.pow(Math.abs(person1[key] - person2[key]), r);
        commonRatings = true;
      }
    }
  }

  var res;

  if(commonRatings){
    res = Math.pow(distance, (1/r));
  } else {
    res = 0;
  }
  return res;
}

function dotProduct(v1, v2){
  var combine = 0;
  for(key in v1){
    if(v1.hasOwnProperty(key)){
      if(key in v2){
        combine += v1[key] * v2[key];
      }
    }
  }

  return combine;
}

function length(v){
  var sum = 0;
  for(key in v){
    if(v.hasOwnProperty(key)){
      sum += Math.pow(v[key], 2);
    }
  }

  return Math.sqrt(sum);
}

function cosine(person1, person2){
  var numerator = dotProduct(person1, person2);
  var denominator = length(person1) * length(person2);

  return numerator/denominator;
}

function adjustedCosine(item1, item2, dataset){
  var numerator = 0;
  var denomLeft = 0;
  var denomRight = 0;
  for(person in dataset){
    if(dataset.hasOwnProperty(person)){
      var personRatings = dataset[person];
      if(personRatings[item1] && (personRatings[item2])){
        var average = averageRating(personRatings);
        numerator+=((personRatings[item1]-average)*(personRatings[item2]-average));
        denomLeft += Math.pow((personRatings[item1]-average), 2);
        denomRight += Math.pow((personRatings[item2]-average), 2);
      }
    }
  }
  var denominator = Math.sqrt(denomLeft)*Math.sqrt(denomRight);
  var res = numerator / denominator;
  return res;
}

function averageRating(person){
  var sum = 0;
  var num = 0;
  for(item in person){
    if(person.hasOwnProperty(item)){
      sum += person[item];
      num++;
    }
  }

  return sum / num;
}

function standardDeviation(ratings){
  var average = averageRating(ratings);
  var count = 0;
  var num = 0;

  for(var rating in ratings){
    if(ratings.hasOwnProperty(rating)){
      num += Math.pow((ratings[rating] - average), 2);
      count++;
    }
  }

  var sd = Math.sqrt(num/count);
  return sd;
}

function Recommender(){
  this.init = function(self, data, k, metric, highisclose, n){
    if(k){ //k-nearest-neighbor
      self.k = k;
    } else {
      self.k = 1;
    }
    if(n){ //maximum number of recommendations to make
      self.n = n;
    } else {
      self.n = 5;
    }

    //how to compute similarity
    if(metric){
      self.distanceFN = metric;
      self.highisclose = highisclose;
    } else {
      self.distanceFN = pearson;
      self.highisclose = true;
    }

    if(data && typeof data == 'object'){
      self.database = data;
    }

    self.frequencies = {};
    self.deviations = {};
  }

  this.computeNearestNeighbor = function(self, username){
    var distances = [];
    for(instance in self.database){
      if((self.database.hasOwnProperty(instance))&&(instance != username)){
        var distance = self.distanceFN(self.database[username], self.database[instance]);
        distances.push([instance, distance]);
      }
    }
    distances.sort(function(a,b){
      if(a[1] > b[1]){
        return self.highisclose? -1:1;
      }
      if(a[1] < b[1]){
        return self.highisclose? 1:-1;
      }
      return 0;
    });
    return distances.slice(0, self.k);
  };

  this.whatFeatures = function(self, item, neighbor){
    var itemStats = self.database[item];
    var neighborStats = self.database[neighbor];
    var res = [];
    var i=0;
    var itemAvg = 0;
    var neighborAvg = 0;
    var countItem = 0;
    var countNeighbor = 0;
    for(var feature in itemStats){
      if((feature in neighborStats)&&(itemStats.hasOwnProperty(feature))){
        itemAvg += itemStats[feature];
        neighborAvg += neighborStats[feature];
        countItem++;
        countNeighbor++;
        var diff = Math.abs(itemStats[feature] - neighborStats[feature]);
        res[i] = [feature, diff];
      }
    }
    itemAvg /= countItem;
    neighborAvg /= countNeighbor;

    //compute sd
    //sort array of features with ratings
    //if low difference and ratings above SD, add to reasons
    //if no such thing exists, allow if one rating is above sd
    //if no such thing exists, allow if both ratings are above avg

  };

  this.recommend = function(self, user){
    var recommendations = {};
    var nearest = self.computeNearestNeighbor(self, user);
    var userRatings = self.database[user];
    var totalDistance = 0;
    nearest.forEach(function(instance){
      totalDistance += instance[1];
    });

    for(neighbor in nearest){
      if(nearest.hasOwnProperty(neighbor)){
        var weight = nearest[neighbor][1] / totalDistance;
        for(item in self.database[nearest[neighbor][0]]){
          if(self.database[nearest[neighbor][0]].hasOwnProperty(item)){
            if(!self.database[user][item]){ //user hasn't rated the item
              if(!recommendations[item]){ //item not yet in recommendations;
                recommendations[item] = self.database[nearest[neighbor][0]][item] * weight;
              } else {
                recommendations[item] += (self.database[nearest[neighbor][0]][item] * weight);
              }
            }
          }
        }
      }
    }

    var recommendationsArr = convertObjtoArry(recommendations);

    recommendationsArr.sort(function(a,b){
      if(a["value"] > b["value"]){
        return self.highisclose? -1:1;
      }
      if(a["value"] < b["value"]){
        return self.highisclose? 1:-1;
      }
      return 0;
    });

    return recommendationsArr.slice(0, self.n+1);
  };

  this.computeDeviations = function(self){
    //for each person, get ratings
    for(person in self.database){
      if(self.database.hasOwnProperty(person)){
        var ratings = self.database[person];
        //for each item and rating
        for(item in ratings){
          if(ratings.hasOwnProperty(item)){
            //for each item2 and rating2 in set of ratings
            for(item2 in ratings){
              if((ratings.hasOwnProperty(item2)) && (item != item2)){
                if(!self.frequencies[item]){
                  self.frequencies[item] = {};
                }
                if(!self.frequencies[item][item2]){
                  self.frequencies[item][item2] = 0;
                }
                if(!self.deviations[item]){
                  self.deviations[item] = {};
                }
                if(!self.deviations[item][item2]){
                  self.deviations[item][item2] = 0;
                }
                self.frequencies[item][item2]++;
                var difference = ratings[item] - ratings[item2];
                self.deviations[item][item2] += difference;
              }
            }
          }
        }
      }
    }
    //divide numerator (currently stored in self.deviations) by frequencies
    for(item in self.deviations){
      if(self.deviations.hasOwnProperty(item)){
        for(item2 in self.deviations[item]){
          if(self.deviations[item].hasOwnProperty(item2)){
            self.deviations[item][item2] /= self.frequencies[item][item2];
          }
        }
      }
    }
  }

  this.slopeOneRec = function(self, userRatings){
    var recommendations = {};
    var frequencies = {};

    //loop through each item user has rated
    for(targetItem in userRatings){
      var targetRating = userRatings[targetItem];
      if(userRatings.hasOwnProperty(targetItem )){
        //loop through all items user didn't rate
        for(otherItem in self.deviations){
          var otherRatings = self.deviations[otherItem];
          if(self.deviations.hasOwnProperty(otherItem)&&
            (!(otherItem in userRatings))&&
            (targetItem in self.deviations[otherItem])){
            var freq = self.frequencies[otherItem][targetItem];
            if(!recommendations[otherItem]){
              recommendations[otherItem] = 0;
            }
            if(!frequencies[otherItem]){
              frequencies[otherItem] = 0;
            }
            recommendations[otherItem] += (otherRatings[targetItem] + targetRating) * freq;
            frequencies[otherItem] += freq;
          }
        }
      }
    }
    //divide by denominator
    for(rec in recommendations){
      if(recommendations.hasOwnProperty(rec)){
        recommendations[rec] /= frequencies[rec];
      }
    }

    var recommendationsArr = convertObjtoArry(recommendations);

    recommendationsArr.sort(function(a,b){
      if(a["value"] > b["value"]){
        return -1;
      }
      if(a["value"] < b["value"]){
        return 1;
      }
      return 0;
    });

    return recommendationsArr;
  };

  this.cosineItemRec = function(self, user){
    //convert ratings to -1 to 1 scale
    var adjustedData = {};
    for(person in self.database){
      if(self.database.hasOwnProperty(person)){
        adjustedData[person] = {};
        for(item in self.database[person]){
          if(self.database[person].hasOwnProperty(item)){
            adjustedData[person][item] = self.normalize(self.database[person][item], 1, 5);
          }
        }
      }
    }

    //compute similarity of each pair of artists
    // var pairs ={};
    // for(person in adjustedData){
    //   if(adjustedData.hasOwnProperty(person)){
    //     var personRatings = adjustedData[person];
    //     for(item1 in personRatings){
    //       pairs[item1] = {};
    //       for(item2 in personRatings){
    //         if((item1 != item2)&&(personRatings.hasOwnProperty(item1))&&(personRatings.hasOwnProperty(item2))){
    //           pairs[item1][item2] = adjustedCosine(item1, item2, adjustedData);
    //         }
    //       }
    //     }
    //   }
    // }

    var pairs ={};
    for(person in self.database){
      if(self.database.hasOwnProperty(person)){
        var personRatings = self.database[person];
        for(item1 in personRatings){
          pairs[item1] = {};
          for(item2 in personRatings){
            if((item1 != item2)&&(personRatings.hasOwnProperty(item1))&&(personRatings.hasOwnProperty(item2))){
              pairs[item1][item2] = adjustedCosine(item1, item2, self.database);
            }
          }
        }
      }
    }

    //compute predicted rating for each band user hasn't rated
    var userRatings = adjustedData[user];
    var recommendations = {};

    var numerator = 0;
    var denominator = 0;
    for(person in adjustedData){
      for(item in adjustedData[person]){
        //find items that the user hasn't rated and that aren't already in recommendations
        if((!(item in userRatings))&&(!(item in recommendations))&&(adjustedData.hasOwnProperty(person))&&(adjustedData[person].hasOwnProperty(item))){
          for(ratedItem in userRatings){
            //if the two items are similar
            if((pairs[ratedItem][item])&&(userRatings.hasOwnProperty(ratedItem))){
              numerator += (pairs[ratedItem][item]*userRatings[ratedItem]);
              denominator += Math.abs(pairs[ratedItem][item]);
            }
          }
          var rating = numerator / denominator;
          recommendations[item] = self.denormalize(rating, 1, 5);
        }
      }
    }

      //turn recommendations obj into an array and sort
      var recAry = convertObjtoArry(recommendations);
      recAry.sort(function(a,b){
        if(a > b)
          return 1;
        if(a < b)
          return -1;
        return 0;
      });

      return recAry;
  };

  this.normalize = function(rating, min, max){
    var numerator = 2*(rating - min) - (max - min);
    var denominator = max - min;
    return numerator / denominator;
  };

  this.denormalize = function(rating, min, max){
    return (0.5*((rating+1)*(max-min))+min);
  }
}

function convertObjtoArry(obj){
  var arry = [];
  var i=0;
  for(item in obj){
    if(obj.hasOwnProperty(item)){
      arry[i] = {"key": item, "value": obj[item]};
      i++;
    }
  }
  return arry;
}

// var rec = new Recommender();
// rec.init(rec, users1, 1, pearson, true, 5);
// console.log(rec.recommend(rec, "Jordyn"));
// rec.computeDeviations(rec);
// console.log(rec.slopeOneRec(rec, users1['Jordyn']));

// var itembased = new Recommender();
// itembased.init(itembased, users2, 1, pearson, true, 5);
// console.log(itembased.recommend(itembased, "Ben"));
// itembased.computeDeviations(itembased);
// console.log(itembased.slopeOneRec(itembased, users2['Ben']));

var cosine = new Recommender();
cosine.init(cosine, users3, 1, pearson, true, 5);
console.log(cosine.cosineItemRec(cosine, "David"));

var nearest = new Recommender();
nearest.init(nearest, music, 1, pearson, true, 5);
console.log(nearest.computeNearestNeighbor(nearest, 'The Black Keys/Magic Potion'));
