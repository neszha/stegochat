<script setup lang="ts"></script>

<template>
  <div class="message-out">
    <div class="d-flex align-items-end flex-column">
      <p class="mb-1 text-muted">
        <small>
          <slot name="time"></slot>
        </small>
      </p>
      <div class="message d-flex align-items-end flex-column">
        <div class="d-flex align-items-center mb-1 chat-msg">
          <div class="flex-shrink-0">
            <ul class="list-inline ms-auto mb-0 chat-msg-option">
              <li class="list-inline-item">
                <div class="dropdown">
                  <a
                    class="avtar avtar-xs btn-link-secondary dropdown-toggle arrow-none"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="ti ti-dots-vertical f-18"></i>
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#"><i class="ti ti-arrow-back-up"></i> Reply</a>
                    <a class="dropdown-item" href="#"
                      ><i class="ti ti-arrow-forward-up"></i> Forward</a
                    >
                    <a class="dropdown-item" href="#"><i class="ti ti-copy"></i> Copy</a>
                    <a class="dropdown-item" href="#"><i class="ti ti-trash"></i> Delete</a>
                  </div>
                </div>
              </li>
              <li class="list-inline-item">
                <a href="#" class="avtar avtar-xs btn-link-secondary">
                  <i class="ti ti-edit-circle f-18"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="flex-grow-1 ms-3">
            <div class="msg-content bg-primary">
              <p class="mb-0">
                <slot name="message"></slot>
              </p>
            </div>
          </div>
        </div>
        <!-- <div class="d-flex align-items-center mb-1 chat-msg">
          <div class="flex-shrink-0">
            <ul class="list-inline ms-auto mb-0 chat-msg-option">
              <li class="list-inline-item">
                <div class="dropdown">
                  <a
                    class="avtar avtar-xs btn-link-secondary dropdown-toggle arrow-none"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="ti ti-dots-vertical f-18"></i>
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#"><i class="ti ti-arrow-back-up"></i> Reply</a>
                    <a class="dropdown-item" href="#"
                      ><i class="ti ti-arrow-forward-up"></i> Forward</a
                    >
                    <a class="dropdown-item" href="#"><i class="ti ti-copy"></i> Copy</a>
                    <a class="dropdown-item" href="#"><i class="ti ti-trash"></i> Delete</a>
                  </div>
                </div>
              </li>
              <li class="list-inline-item">
                <a href="#" class="avtar avtar-xs btn-link-secondary">
                  <i class="ti ti-edit-circle f-18"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="flex-grow-1 ms-3">
            <div class="msg-content bg-primary">
              <p class="mb-0">Are u listening me ?</p>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center mb-1 chat-msg">
          <div class="flex-shrink-0">
            <ul class="list-inline ms-auto mb-0 chat-msg-option">
              <li class="list-inline-item">
                <div class="dropdown">
                  <a
                    class="avtar avtar-xs btn-link-secondary dropdown-toggle arrow-none"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="ti ti-dots-vertical f-18"></i>
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#"><i class="ti ti-arrow-back-up"></i> Reply</a>
                    <a class="dropdown-item" href="#"
                      ><i class="ti ti-arrow-forward-up"></i> Forward</a
                    >
                    <a class="dropdown-item" href="#"><i class="ti ti-copy"></i> Copy</a>
                    <a class="dropdown-item" href="#"><i class="ti ti-trash"></i> Delete</a>
                  </div>
                </div>
              </li>
              <li class="list-inline-item">
                <a href="#" class="avtar avtar-xs btn-link-secondary">
                  <i class="ti ti-edit-circle f-18"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="flex-grow-1 ms-3">
            <div class="msg-content bg-primary">
              <p class="mb-0">How can i cap you today?</p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
