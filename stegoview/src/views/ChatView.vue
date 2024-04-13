<script setup lang="ts">
import MessageIn from '@/components/chat/MessageIn.vue'
import MessageOut from '@/components/chat/MessageOut.vue'
</script>

<template>
  <main class="">
    <div class="pc-content">
      <div class="row">
        <div class="col-sm-12">
          <div class="chat-wrapper">
            <div class="chat-content">
              <div class="card mb-0">
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
                              src="@/assets/images/user/avatar-3.jpg"
                              alt="User image"
                            />
                            <i class="chat-badge bg-success"></i>
                          </div>
                          <div class="media-body mx-3 d-none d-sm-inline-block">
                            <h6 class="mb-0">Alene</h6>
                            <span class="text-sm text-muted">ui/ux designer</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <ul class="list-inline ms-auto mb-0">
                      <li class="list-inline-item">
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
                      </li>
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
                <div class="scroll-block overflow-auto chat-message">
                  <div class="card-body">
                    <MessageIn>
                      <template #image>
                        <img
                          class="rounded-circle img-fluid wid-40"
                          src="@/assets/images/user/avatar-3.jpg"
                          alt="User image"
                        />
                      </template>
                      <template #name>Alene</template>
                      <template #time>10:00 AM</template>
                      <template #message> Hi...Henny!! </template>
                    </MessageIn>
                    <MessageOut>
                      <template #time>10:00 AM</template>
                      <template #message> Hi...Alene!! </template>
                    </MessageOut>
                    <MessageIn>
                      <template #image>
                        <img
                          class="rounded-circle img-fluid wid-40"
                          src="@/assets/images/user/avatar-3.jpg"
                          alt="User image"
                        />
                      </template>
                      <template #name>Alene</template>
                      <template #time>12:00 AM</template>
                      <template #message> Hi...Henny!! </template>
                    </MessageIn>
                  </div>
                </div>
                <div class="card-footer pb-5 px-3">
                  <textarea
                    class="form-control border-0 shadow-none px-0"
                    placeholder="Type a Message"
                    rows="2"
                  ></textarea>
                  <hr class="my-2" />
                  <div class="d-sm-flex align-items-center">
                    <ul class="list-inline me-auto mb-0">
                      <li class="list-inline-item">
                        <a href="#" class="avtar avtar-xs btn-link-secondary">
                          <i class="ti ti-paperclip f-18"></i>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a href="#" class="avtar avtar-xs btn-link-secondary">
                          <i class="ti ti-photo f-18"></i>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a href="#" class="avtar avtar-xs btn-link-secondary">
                          <i class="ti ti-mood-smile f-18"></i>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a href="#" class="avtar avtar-xs btn-link-secondary">
                          <i class="ti ti-volume f-18"></i>
                        </a>
                      </li>
                    </ul>
                    <ul class="list-inline ms-auto mb-0">
                      <li class="list-inline-item">
                        <a href="#" class="avtar avtar-s btn-link-primary">
                          <i class="ti ti-send f-18"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
