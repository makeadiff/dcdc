<template>
    <div
        id="header"
        class="navbar navbar-fixed-top navbar-inverse"
        role="navigation"
    >
        <div class="container">
            <div class="navbar-brand"><a href="/">DC/DC</a></div>

            <div class="collapse navbar-collapse">
                <ul id="nav-links" class="nav navbar-nav pull-right">
                    <li><a href="index.php">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!--   <div id="header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#/">DCDC</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">Logout</li>
        </ul>
      </div>
    </nav>
  </div> -->
</template>

<script>
export default {
    name: "Header",
    props: {
        msg: String
    }
};
</script>
