<script setup lang="ts"></script>

<template>
  <main class="py-3">
    <div class="pc-content">
      <div class="row">
        <div class="col-sm-12">
          <div class="chat-wrapper">
            <div class="chat-content">
              <div class="card mb-0 min-vh-100">
                <div class="card-header p-3">
                  <div class="d-flex align-items-center">
                    <ul class="list-inline me-auto mb-0">
                      <li class="list-inline-item align-bottom">
                        <a
                          href="#"
                          class="d-xxl-none avtar avtar-s btn btn-link-secondary"
                          type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasScrolling"
                          aria-controls="offcanvasScrolling"
                        >
                          <i class="ti ti-menu-2 f-18"></i>
                        </a>
                        <a
                          href="#"
                          class="d-none d-xxl-inline-flex avtar avtar-s btn-link-secondary"
                          type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasScrolling"
                          aria-controls="offcanvasScrolling"
                        >
                          <i class="ti ti-menu-2 f-18"></i>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <div class="media align-items-center">
                          <div class="chat-avtar">
                            <img
                              class="rounded-circle img-fluid wid-40"
                              src="@/assets/images/user/avatar-6.jpg"
                              alt="User image"
                            />
                            <i class="chat-badge bg-success"></i>
                          </div>
                          <div class="media-body mx-3 d-none d-sm-inline-block">
                            <h6 class="mb-0">StegoAdmin</h6>
                            <span class="text-sm text-muted">Pull Stack Developer</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <ul class="list-inline ms-auto mb-0">
                      <!-- <li class="list-inline-item">
                        <a href="#" class="avtar avtar-s btn-link-secondary">
                          <i class="ti ti-phone-call f-18"></i>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a href="#" class="avtar avtar-s btn-link-secondary">
                          <i class="ti ti-video f-18"></i>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a
                          href="#"
                          class="d-xxl-none avtar avtar-s btn-link-secondary"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvas_User_info"
                        >
                          <i class="ti ti-info-circle f-18"></i>
                        </a>
                        <a
                          href="#"
                          class="d-none d-xxl-inline-flex avtar avtar-s btn-link-secondary"
                          data-bs-toggle="collapse"
                          data-bs-target="#chat-user_info"
                        >
                          <i class="ti ti-info-circle f-18"></i>
                        </a>
                      </li> -->
                      <li class="list-inline-item">
                        <div class="dropdown">
                          <a
                            class="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="ti ti-dots f-18"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="#">Name</a>
                            <a class="dropdown-item" href="#">Date</a>
                            <a class="dropdown-item" href="#">Ratting</a>
                            <a class="dropdown-item" href="#">Unread</a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="d-flex flex-column justify-content-center align-items-center card-body">
                  <form class="form" method="POST" enctype="application/x-www-form-urlencoded">
                    <div class="mb-3">
                      <label for="file" class="form-label">Upload image to join</label>
                      <input type="file" id="file" class="form-control" />

                      <div class="form-text">Upload your file here.</div>
                      <button type="submit" class="btn btn-primary mt-3">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
