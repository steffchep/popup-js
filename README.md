# popup-js
a simple popup module for use with requirejs and similar

Just clone the repo and copy css and js to your project

**Usage:**

<pre>
requirejs.config({
   paths: {
       popups: "[js-lib-path]/popups",
       ...
   }
});


...

define(['popups'], function(popups) {
   popups.alert("this is a title", "this is my message", function() {
      console.log("do this if okay is pressed");
   });
   popups.confirm("this is a title", "this is my message", function() {
      console.log("do this if 'yes' is pressed");
   }, function() {
      console.log("do this if 'no' is pressed");
   });
})
</pre>