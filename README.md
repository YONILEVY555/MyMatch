<h1 align="center"> Match </h1>

<h2 align="left">the project's target:</h2>

<p>Create an interface that will allow a new and better way to find a relationship.</p> 

<h2 align="left">Technologies:</h2>

<p>Frontend - JavaScript, HTML, CSS, React, Bootstrap</p> 
<p>Backend - Java, JPA, Spring Boot, Spring Data JPA</p> 

<h2 align="left">The idea in a few sentences:</h2>

<p>Take Tinder's interface and add two elements that you forgot to add there. To these elements I call "reliability" and "commitment."</p> 

<h2 align="left">A brief introduction for those who do not know how the Tinder app works:</h2>

<p>After registering for the app you will see pictures of "potential matches" for each such picture you can make "liked" or "disliked". When two people "love" each other, a "match" is created between them and the ability to talk in a chat opens up for them. (Very important - you can not know that you liked or who liked you until a match was made) The idea was very successful and became very popular around the world. The reasons why this idea was so successful are many. The following reasons can be listed to explain why it is so successful. Anonymity - Each user is required to provide only a few details that add up to the photo, age and first name. 2. Exposure to a huge pool of "potential matches". 3. Lowering all the psychological barriers that exist in reality. With the flick of a finger you decide who is and who is not. The advantages I mentioned above also produce two disadvantages and they are: 1. Zero commitment. That everything is so easy and so anonymous then there is also zero commitment. 2. Very little reliability. Given so few details you have no idea who is on the other side. My interface will solve these two problems</p> 

<h2>The idea in detail:</h2>

<h3>Some definitions for understanding the concept:</h3>

<p>First circle - the people you know personally. That you have an intimate relationship with them. According to the "Denver Number" the number of people who can be in this circle is at most 150</p> 

<p>Second circle - friends of friends. That is, if I know Noya and Noya knows Shaked then Shaked is in a second circle.</p> 

<p>Potential Match - People who are in the user's second or third circle.</p> 

```diff
-It's important to note this ->
```

<p>assuming each app user has 100 members, how many potential matches can he have? Theoretically the maximum possible is: that in the second circuit it will have 100 ^ 2 = 10K options and in the third circuit 100 ^ 3 = 1M. But in reality one should always do filtering according to his preferences such as age, gender etc. In addition to this the duplicates should be filtered and also the members from the first circle who are in the second and third circles should be filtered. So reality has a lot less. But there are still quite a few at all</p>

<h3>And for the idea:</h3>

<p> each user adds up to 100 members and no more! . People he knows that he trusts and that he would be happy to have known as a spouse or partner. You can search for friends by cell phone number
 Or their email. After mechanizing as on Tinder in the search for a potential match, pictures of the potential matches will appear. In a very important addition of a visual display of the network of connections through which it is connected to the same potential match (can be seen in the pictures below). And now before you like it you get more information that is not on Tinder.
 </p>

 <h2>How does this solve Tinder's problem? Answer:</h2>

 <p>Reliability - For most of the years of human existence you have not been as glorious as technology is today. People knew, saw and met almost exclusively people they knew personally or someone from their first circle knew. The thought of trusting a complete stranger would have seemed delusional then. Today technology has changed sex from end to end this idea. But these biological instincts are still deeply ingrained in us. Even today we will feel great confidence in a person who is a friend of a friend and not just a stranger </p>

 <p>Commitment - we will explain this with an example: I, Jonathan, added 50 new members to my pool of friends. I go to the "Find a new match" page. And I get a picture of a girl named Noa. I see I'm connected to Noa in ten possible paths. One of the paths for the purpose of The example is: Jonathan (me) -> Neria -> Noa. I appreciate Neria and if I'm not really interested then I will not just do Like. Plus I know I'm no longer completely anonymous. Noah also saw how she was related to me. Now I know she knows who she knows who knows me. Obviously I will not allow myself to speak badly, take advantage of lying and all. I will only get into this if I have a drop of commitment
</p>

<h2>pages:</h2>

- ![#a3218e](https://via.placeholder.com/15/f03c15/000000?text=+) `Home`
- ![#6fbf42](https://via.placeholder.com/15/c5f015/000000?text=+) `Main login`
- ![#a3218e](https://via.placeholder.com/15/c5f015/000000?text=+) `Login by phone`
- ![#f8a51b](https://via.placeholder.com/15/c5f015/000000?text=+) `Login by email`
- ![#1f4199](https://via.placeholder.com/15/1589F0/000000?text=+) `Registration`
- ![#a3218e](https://via.placeholder.com/15/f03c15/000000?text=+) `Find match`
- ![#1589F0](https://via.placeholder.com/15/1589F0/000000?text=+) `New matcht`
- ![#c5f015](https://via.placeholder.com/15/c5f015/000000?text=+) `Profile`
- ![#1f4199](https://via.placeholder.com/15/c5f015/000000?text=+) `Updated details`
- ![#a3218e](https://via.placeholder.com/15/1589F0/000000?text=+) `Find friends`
- ![#1589F0](https://via.placeholder.com/15/1589F0/000000?text=+) `Show matches`
- ![#6fbf42](https://via.placeholder.com/15/1589F0/000000?text=+) `Show friends`
- ![#1f4199](https://via.placeholder.com/15/1589F0/000000?text=+) `Show friends request`


<h2> screenshot: </h2>

<br><br

<h3> Home </h3>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/home_page.png?raw=true)

<br><br>

<h3> Main login </h3>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/find_friends.png?raw=true)

<br><br>

<h3> Login by phone </h3>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/login_by_phone.png?raw=true)

<br><br>

<h3> Login by email </h3>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/login_by_email.png?raw=true)

<br><br>

<h3> Registration </h3>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/register.png?raw=true)

<br><br>

<h3> Find match </h3>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/find_match.png?raw=true)

<br><br>

<h3> New match </h3>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/new_match.png?raw=true)

<h3> Profile </h3>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/profile.png?raw=true)

<br><br>

<h3> Updated details </h3>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/update_details.png?raw=true)

<br><br>

<h3> Find friends </h3>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/find_friends.png?raw=true)

<br><br>

<h3> Show matches </h3>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/my_matches.png?raw=true)

<br><br>

<h3> Show friends </h3>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/my_friends.png?raw=true)

<br><br>

<h3> Show friends request </h3>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/friend_request.png?raw=true)












