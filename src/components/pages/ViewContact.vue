<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <p class="h3 text-primary fw-bold">View Contact</p>
        <p class="fst-italic">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam animi
          vero dicta unde veniam ea rem velit quaerat laudantium nam natus,
          reiciendis vel vitae, rerum, aspernatur quasi modi est error!
        </p>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-4">
        <img
          class="contact-img-big"
          :src="selectedContact.photoURL"
          alt=""
        />
      </div>
      <div class="col-md-6">
        <ul class="list-group">
          <li class="list-group-item">
            <span class="fw-bold">Name: </span> {{ selectedContact.name }}
          </li>
          <li class="list-group-item">
            <span class="fw-bold">Nickname: </span>
            {{ selectedContact.nickname }}
          </li>
          <li class="list-group-item">
            <span class="fw-bold">Mobile#: </span> {{ selectedContact.mobile }}
          </li>
          <li class="list-group-item">
            <span class="fw-bold">Email: </span> {{ selectedContact.email }}
          </li>
          <li class="list-group-item">
            <span class="fw-bold">Birthday: </span>
            {{ formatBirthday }}
          </li>
          <li class="list-group-item">
            <span class="fw-bold">Group: </span> {{ selectedContact.group }}
          </li>
        </ul>
      </div>
      <div class="row mt-5">
        <div class="col">
          <router-link to="/" class="btn btn-primary">
            <i class="fa fa-arrow-alt-circle-left"></i>&nbsp;Back</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { contactService } from "@/services/contactService";
export default {
  props: ["contactId"],
  data() {
    return {
      selectedContact: [],
    };
  },
  created() {
    this.loadSelectedContact();
  },
  computed: {
    formatBirthday() {
      const formattedDate = new Date(this.selectedContact.birthday).toDateString()
      return formattedDate.substring(4)
    },
  },
  methods: {
    async loadSelectedContact() {
      try {
        const response = await contactService.getContact(this.contactId);
        this.selectedContact = response;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
</style>