<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <p class="h3 text-primary fw-bold">Edit Contact</p>
        <p class="fst-italic">Don't forget to save changes.</p>
      </div>
    </div>
  </div>
  <div v-if="isLoading">
    <div class="container">
      <div class="row">
        <div class="col">
          <loading-spinner></loading-spinner>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="updateContact">
          <div class="mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Name*"
              v-model="selectedContact.name"
            />
          </div>
          <div class="mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Nickname"
              v-model="selectedContact.nickname"
            />
          </div>
          <div class="mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Photo URL"
              v-model="selectedContact.photoURL"
            />
          </div>
          <div class="mb-2">
            <input
              type="email"
              class="form-control"
              placeholder="Email*"
              v-model="selectedContact.email"
            />
          </div>
          <div class="mb-2">
            <input
              type="number"
              class="form-control"
              placeholder="Mobile*"
              v-model="selectedContact.mobile"
            />
          </div>
          <div class="mb-2">
            <date-picker
              v-model="selectedContact.birthday"
              placeholder="Birthday"
            ></date-picker>
          </div>
          <div class="mb-2">
            <select
              name=""
              id=""
              class="form-control"
              v-model="selectedContact.group"
            >
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Colleague">Colleague</option>
            </select>
          </div>
          <div class="mb-2">
            <button class="btn btn-primary">Update</button> &nbsp;
            <router-link to="/contacts" type="button" class="btn btn-danger"
              >Cancel</router-link
            >
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <img class="contact-img" :src="selectedContact.photoURL" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { contactService } from '@/services/contactService';
import validator from 'validator';
export default {
  props: ['contactId'],
  data() {
    return {
      selectedContact: [],
      isLoading: false,
      errorMsg: null,
    };
  },
  created() {
    this.loadSelectedContact();
  },
  methods: {
    async loadSelectedContact() {
      this.isLoading = true;
      this.errorMsg = null;
      try {
        const response = await contactService.getContact(this.contactId);
        this.selectedContact = response;
        this.isLoading = false;
      } catch (err) {
        this.errorMsg = err;
      }
    },
    async updateContact() {
      if (
        !this.selectedContact.name ||
        !this.selectedContact.mobile ||
        !this.selectedContact.email
      ) {
        return alert('Name, mobile and email fields are required!');
      }
      if (!validator.isEmail(this.selectedContact.email)) {
        return alert('Please provide a valid email address!');
      }

      //format birthday so it can be stored in firebase correctly
      let formattedBday = new Date(
        this.selectedContact.birthday
      ).toLocaleDateString();

      const formData = {
        name: this.selectedContact.name,
        nickname: this.selectedContact.nickname,
        photoURL: this.selectedContact.photoURL,
        email: this.selectedContact.email,
        mobile: this.selectedContact.mobile,
        birthday: formattedBday,
        group: this.selectedContact.group,
      };

      try {
        const response = await contactService.updateContact(
          this.contactId,
          formData
        );
        alert(response);
        this.$router.push('/contacts');
      } catch (err) {
        alert(err);
      }
    },
  },
};
</script>

<style scoped></style>
