The project is solution for test task for Frontend Software Engineer on Upwork. 

Project consists of: 

1. handleDuplicates.js. It exports function handleDuplicates that processes user duplicates according to task requirements.
Notes about the implementation: 
  - Sort function is generic, it can sort users by any number of fields. 
  - I assumed that full duplicates (all three fields equal) could not be present in an input. For such case the function   would print both id and company in label. Of course, if this case must be handled in another way, it can be easily       changed.

2. handleDuplicatesSpec.js contains unit tests for that function. Tests do not use any framework. I'm familiar with Karma, Jasmine unit test frameworks, didn't use it here just to make code simpler.
