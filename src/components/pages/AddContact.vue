<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <p class="h3 text-primary fw-bold">Add Contact</p>
        <p class="fst-italic">
          Please provide the needed information to add a new contact..
        </p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="addContact">
          <div class="mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Name*"
              v-model.trim="name"
            />
          </div>
          <div class="mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Nickname"
              v-model.trim="nickname"
            />
          </div>
          <div class="mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Photo URL"
              v-model.trim="photoURL"
            />
          </div>
          <div class="mb-2">
            <input
              type="email"
              class="form-control"
              placeholder="Email*"
              v-model.trim="email"
            />
          </div>
          <div class="mb-2">
            <input
              type="number"
              class="form-control"
              placeholder="Mobile*"
              v-model.trim="mobile"
            />
          </div>
          <div class="mb-2">
            <date-picker
              v-model="birthday"
              placeholder="Birthday"
              modelType="dd.MM.yyyy"
            ></date-picker>
          </div>
          <div class="mb-2">
            <select name="" id="" class="form-control" v-model="group">
              <option value="" disabled selected>Select Group</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Colleague">Colleague</option>
            </select>
          </div>
          <div class="mb-2">
            <button class="btn btn-primary">Add contact</button>
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <img class="contact-img" :src="photoImage" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { contactService } from '../../services/contactService';
import validator from 'validator';

export default {
  data() {
    return {
      name: '',
      nickname: '',
      photoURL: '',
      email: '',
      mobile: '',
      birthday: '',
      group: '',
    };
  },
  computed: {
    photoImage() {
      return this.photoURL
        ? this.photoURL
        : 'https://cdn5.vectorstock.com/i/thumb-large/45/79/male-avatar-profile-picture-silhouette-light-vector-4684579.jpg';
    },
  },
  methods: {
    async addContact() {
      if (!this.name || !this.mobile || !this.email) {
        return alert('Name, mobile and email fields are required!');
      }
      if (!validator.isEmail(this.email)) {
        return alert('Please provide a valid email address!');
      }

      //format birthday so it can be stored in firebase correctly
      let dateArr = this.birthday.split('.');
      let formattedBday = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`;

      const formData = {
        name: this.name,
        nickname: this.nickname,
        photoURL: this.photoURL,
        email: this.email,
        mobile: this.mobile,
        birthday: formattedBday,
        group: this.group,
      };

      try {
        const status = await contactService.addNewContact(formData);
        console.log(status);
        this.$router.push('/contacts');
      } catch (err) {
        alert(err);
      }
    },
  },
};
</script>

<style scoped></style>
