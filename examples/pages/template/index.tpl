<template>
  <div>
    <div class="banner">
      <div class="banner-sky"></div>
      <img class="banner-stars" src="~examples/assets/images/stars.png" alt="Element">
      <div class="container">
        <div class="banner-desc">
          <h2><%= 1 ></h2>
          <div id="line2" class="actor"></div>
          <p><%= 2 ></p>
        </div>
        <img src="~examples/assets/images/banner-bg.svg" alt="Element">
      </div>
    </div>
    <div class="cards">
      <ul class="container">
        <li>
          <div class="card">
            <img src="~examples/assets/images/guide.png" alt="">
            <h3><%= 3 ></h3>
            <p><%= 4 ></p>
            <router-link
              active-class="active"
              to="/<%= lang >/guide/design"
              exact><%= 5 >
            </router-link>
          </div>
        </li>
        <li>
          <div class="card">
            <img src="~examples/assets/images/component.png" alt="">
            <h3><%= 6 ></h3>
            <p><%= 7 ></p>
            <router-link
              active-class="active"
              to="/<%= lang >/component/layout"
              exact><%= 5 >
            </router-link>
          </div>
        </li>
        <li>
          <div class="card">
            <img src="~examples/assets/images/resource.png" alt="">
            <h3><%= 8 ></h3>
            <p><%= 9 ></p>
            <router-link
              active-class="active"
              to="/<%= lang >/resource"
              exact><%= 5 >
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import theaterJS from 'theaterjs';

  export default {
    mounted() {
      function typing(theater) {
        theater
          <%= typingFunc >
          .addScene((done) => {
            typing(theater);
            done();
          });
      }
      var theater = theaterJS(<%= theatreParam >);
      theater
        .on('type:start, erase:start', function() {
          theater.getCurrentActor().$element.classList.add('typing');
        })
        .on('type:end, erase:end', function() {
          theater.getCurrentActor().$element.classList.remove('typing');
        });
      theater
        <%= typingInvoke >
        .addScene((done) => {
          typing(theater);
          done();
        });
    }
  };
</script>
