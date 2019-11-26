<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark">
        <a class="navbar-brand" href="#">
            <!-- <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt=""> &nbsp; -->
            <strong>DC</strong>/DC
        </a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/">
                        <i class="icon ion-md-home"></i> Home
                        <span class="sr-only">(current)</span>
                    </a>
                </li>
                <!-- <li class="nav-item">
        <a class="nav-link" href="contributors">Contributors</a>
      </li> -->
                <!--<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Components
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>-->
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <div class="profile_image">
                    <img src="https://picsum.photos/id/237/200/300" />
                </div>
                <span class="user_name"> </span>
                <li>
                    <a href="index.php">Logout</a>
                </li>
            </form>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Header",
    props: {
        msg: String
    }
};
</script>
