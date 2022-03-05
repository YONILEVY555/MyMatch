<h1 align="center"> Match </h1>

<h2 align="left">the project's target:</h2>

<p>To create an interface that will allow a new and better way to find a relationship.</p> 

<h2 align="left">Technologies:</h2>

<p>Frontend - JavaScript, HTML, CSS, React, Bootstrap</p> 
<p>Backend - Java, JPA, Spring Boot, Spring Data JPA</p> 

<h2 align="left">The idea in a few sentences:</h2>

<p>Take Tinder's interface and add two elements that you forgot to add there. To these elements I call "reliability" and "commitment."</p> 

<h2 align="left">A brief introduction for those who do not know how the Tinder app works:</h2>

<p>After registering for the app you will see pictures of "potential matches" for each such picture you can make "like" or "dislike". When two people "like" each other, a "match" is created between them and the ability to talk in a chat opens up for them. No one can know that you "like" or "who like you" until a match is created. The idea was very successful and became very popular around the world. The reasons why this idea was so successful are many. The following reasons can be listed to explain why it is so successful.1. Anonymity - each user is required to provide only a few details that add up to the photo, age and first name. 2. Exposure to a huge pool of "potential matches". 3. Lowering all the psychological barriers that exist in reality. With the flick of a finger you decide who is and who is not. The advantages I mentioned above also produce two disadvantages and they are: 1. Zero commitment. That everything is so easy and so anonymous then there is also zero commitment. 2. Very little reliability. Given so few details' you have no idea who is on the other side. My interface will solve these two problems.
</p> 

<h2>The idea in detail:</h2>

<h3>Some definitions for understanding the concept:</h3>

<p> First circle (friends) - the people you know personally and that you have an intimate relationship with them. According to the "Denver Number" the number of people who can be in this circle is at most 150.</p> 

<p>Second circle - friends of friends. That is, if I know Noya and Noya knows Shaked then Shaked is in the second circle.</p> 

<p>Third circle - a friend of a friend of a friend. The idea is already clear.</p> 

<p>Potential Match - people who are in the user's second or third circle.</p> 

```diff
-It's important to note this ->
```

<p>Each user adds up to 100 friends and no more!. The friends are people he knows that he trusts and that he would be happy through them to know a spouse. You can find friends by their cell phone number or their email. Like on Tinder, in the search for a potential match, pictures of the potential matches will appear.</p>

<p>And this is where my idea comes in, in a visual way you can see how you are related to the match that appears on the screen. See image below</p>

![alt text](https://github.com/YONILEVY555/MyMatch/blob/main/screenshot/find_match.png?raw=true)


<p>It's important to note this - assuming each app user has 100 friends, how many potential matches can he have? Theoretically the maximum possible will be in the second circle one hundred squared and in the third circle it will be one hundred in the power of three. But in reality, we will filter according to our preferences such as age, gender etc. In addition, we will also filter duplicates and friends from the first circle who are already in the second and third circle. So, in reality there will be less, but there are still quite a few at all.</p>


<h3>How does this solve Tinder's disadvantages? </h3>

<p>Reliability- for the entire period of human existence there have never been such a technological development as there is today. Once people knew, saw or met only people they knew personally or someone that their friends knew from the first circle. The thought of trusting a complete stranger would have seemed delusional then. Today technology has completely changed this culture. There are biological instincts deeply ingrained in us. Even today we will feel great confidence in a person who is a friend of a friend and not just a stranger.
 </p>

 <p>Commitment - I will explain this with an example: I, Jonathan, added 50 new friends to my pool of friends. I go to page "Find a new match", and then I get a picture of a girl named Noa. I will then see how I'm connected to Noa in ten possible paths. One of the paths for this purpose in the example: Jonathan (me) -> Neria -> Noa. I appreciate Neria but if I'm not really interested in Noa I will not give her "like"' but if I am interested I will give her a like . Now I'm no longer completely anonymous. Noa will also see how she is related to me. Obviously, I will not allow myself to speak badly, take advantage of lying and so'. I will only get into this if I have a drop of commitment. </p>

<h2>pages:</h2>

- ![#a3218e](https://via.placeholder.com/15/f03c15/000000?text=+) `Home`
- ![#f8a51b](https://via.placeholder.com/15/c5f015/000000?text=+) `Main login`
- ![#6fbf42](https://via.placeholder.com/15/c5f015/000000?text=+) `Login by phone`
- ![#1f4199](https://via.placeholder.com/15/c5f015/000000?text=+) `Login by email`
- ![#a3218e](https://via.placeholder.com/15/1589F0/000000?text=+) `Registration`
- ![#f8a51b](https://via.placeholder.com/15/f03c15/000000?text=+) `Find match`
- ![#6fbf42](https://via.placeholder.com/15/1589F0/000000?text=+) `New matcht`
- ![#1f4199](https://via.placeholder.com/15/c5f015/000000?text=+) `Profile`
- ![#a3218e](https://via.placeholder.com/15/c5f015/000000?text=+) `Updated details`
- ![#f8a51b](https://via.placeholder.com/15/1589F0/000000?text=+) `Find friends`
- ![#6fbf42](https://via.placeholder.com/15/1589F0/000000?text=+) `Show matches`
- ![#1f4199](https://via.placeholder.com/15/1589F0/000000?text=+) `Show friends`
- ![#a3218e](https://via.placeholder.com/15/1589F0/000000?text=+) `Show friends request`
- ![#a3218e](https://via.placeholder.com/15/1589F0/000000?text=+) `Error page`

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












