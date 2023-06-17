# belly-button-challenge
UofU Week 14 Assignment

This Assignment is broken down into three parts.  

The first is to pull the data from a remote site.  For this exercise we pulled a larg CSV called samples.json [https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json] (https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json) 

We then needed a HTML boilerplate. This was provide for us for the exercise.

From these two givens. We needed to create some dynamic code using JavaScript to create an interactive dropdown selection which then would update two charts (Bar and Bubble).

The third piece is the JS code.  The creation of my code came from great assistance from BingAI and ChatGPT. There are some minor to moderate modifications I put in while trying to get the end result to read close to the example provide in the assignment.

The required files to get this to work are all in the main branch of the respostory and below is a quick list.

__index.html__</br>
__app.js__

There is a folder called data that has the same sample.json file if the remote site is not accessible. To use this file instead of the remote call you would need to change this line...

    const jsondata = d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json");

with this

    const jsondata = d3.json(".data/samples.json");



This assignment is posted to Git Pages for access. 

Thank you for taking the time to look at my assignment. 


