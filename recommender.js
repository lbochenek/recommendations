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
  }

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
  }

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

var rec = new Recommender();
rec.init(rec, users1, 1, pearson, true, 5);
console.log(rec.recommend(rec, "Jordyn"));
rec.computeDeviations(rec);
console.log(rec.slopeOneRec(rec, users1['Jordyn']));

var itembased = new Recommender();
itembased.init(itembased, users2, 1, pearson, true, 5);
console.log(itembased.recommend(itembased, "Ben"));
itembased.computeDeviations(itembased);
console.log(itembased.slopeOneRec(itembased, users2['Ben']));
