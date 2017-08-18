var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat a libero non euismod. Phasellus sed enim varius, sagittis odio eu, euismod libero. Cras vulputate fringilla bibendum. Mauris ut turpis in quam ultricies auctor. Sed eget egestas nunc, ut finibus lorem. Aliquam metus odio, condimentum ut ornare eu, iaculis in enim. Vestibulum ac nulla nisi. Nam ut justo enim. Fusce arcu diam, dictum eu suscipit non, congue et nunc. Cras tincidunt velit ac orci tempor efficitur. Proin imperdiet, eros eu rhoncus vehicula, velit leo fringilla lacus, id sagittis elit tellus ut dolor. Nunc ipsum nisl, tempus at lectus eget, vehicula consectetur ipsum."
    },
    {
        name: "Canyon Floor",
        image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat a libero non euismod. Phasellus sed enim varius, sagittis odio eu, euismod libero. Cras vulputate fringilla bibendum. Mauris ut turpis in quam ultricies auctor. Sed eget egestas nunc, ut finibus lorem. Aliquam metus odio, condimentum ut ornare eu, iaculis in enim. Vestibulum ac nulla nisi. Nam ut justo enim. Fusce arcu diam, dictum eu suscipit non, congue et nunc. Cras tincidunt velit ac orci tempor efficitur. Proin imperdiet, eros eu rhoncus vehicula, velit leo fringilla lacus, id sagittis elit tellus ut dolor. Nunc ipsum nisl, tempus at lectus eget, vehicula consectetur ipsum."
    },
    {
        name: "Desert Mesa",
        image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat a libero non euismod. Phasellus sed enim varius, sagittis odio eu, euismod libero. Cras vulputate fringilla bibendum. Mauris ut turpis in quam ultricies auctor. Sed eget egestas nunc, ut finibus lorem. Aliquam metus odio, condimentum ut ornare eu, iaculis in enim. Vestibulum ac nulla nisi. Nam ut justo enim. Fusce arcu diam, dictum eu suscipit non, congue et nunc. Cras tincidunt velit ac orci tempor efficitur. Proin imperdiet, eros eu rhoncus vehicula, velit leo fringilla lacus, id sagittis elit tellus ut dolor. Nunc ipsum nisl, tempus at lectus eget, vehicula consectetur ipsum."
    }
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campgrounds!");
        // Add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){ // error creating campground
                    console.log(err);
                } else{  // successfully created campground
                    console.log("Added a campground");
                    // Create a comment
                    Comment.create(
                        {
                            text: "This place is wonderful, but I wish there was internet :(",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){ // error creating comment
                                console.log(err);
                            } else { // successfully created comment
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;