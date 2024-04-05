<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <p class="h3 text-primary fw-bold">
          All Contacts
          <router-link class="btn btn-primary btn-sm" to="/contacts/add">
            <i class="fa fa-plus-circle"></i> Add</router-link
          >
        </p>
        <p class="fst-italic">
          This is where you can see all your added contacts. A notification will
          pop out on this page when one of your contact has his/her birthday.
          You can search your contacts using the search bar below. You can
          search for their name, nickname, email, mobile, group or even their
          birthday!
        </p>
        <div class="row">
          <div class="col-md-8">
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  v-model="txtSearch"
                  placeholder="Search contact"
                />
              </div>
              <div class="col"></div>
            </div>
          </div>
        </div>
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
  <div v-if="!isLoading && !errorMsg && listOfContacts.length === 0">
    <div class="container">
      <div class="row">
        <div class="col">
          <no-found-contact></no-found-contact>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!isLoading && errorMsg">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Error</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6" v-for="contact in listOfContacts" :key="contact.id">
        <div class="card my-2 list-group-item-primary shadow-lg">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-sm-4">
                <img :src="contact.photoURL" alt="" class="contact-img" />
              </div>
              <div class="col-sm-7">
                <ul class="list-group">
                  <li class="list-group-item">
                    <span class="fw-bold">Name: </span> {{ contact.name }}
                    <span v-if="contact.nickname"
                      >({{ contact.nickname }})
                    </span>
                  </li>
                  <li class="list-group-item">
                    <span class="fw-bold">Email: </span> {{ contact.email }}
                  </li>
                  <li class="list-group-item">
                    <span class="fw-bold">Mobile#: </span> {{ contact.mobile }}
                  </li>
                </ul>
              </div>
              <div
                class="col-sm-1 d-flex flex-column justify-content-center align-items-center"
              >
                <router-link
                  :to="`/contacts/view/${contact.id}`"
                  class="btn btn-warning my-1"
                  title="View contact"
                >
                  <i class="fa fa-eye"></i>
                </router-link>
                <router-link
                  :to="`/contacts/edit/${contact.id}`"
                  class="btn btn-success my-1"
                  title="Edit contact"
                >
                  <i class="fa fa-pen"></i>
                  <title>Edit Contact</title>
                </router-link>
                <button
                  class="btn btn-danger my-1"
                  @click="deleteContact(contact.id)"
                  title="Delete contact"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { contactService } from '@/services/contactService';
import NoFoundContact from '../ui/NoFoundContact.vue';
export default {
  components: {
    NoFoundContact,
  },
  data() {
    return {
      listOfContacts: [],
      isLoading: false,
      errorMsg: null,
      txtSearch: '',
    };
  },
  created() {
    this.loadAllContacts();
  },
  watch: {
    txtSearch() {
      this.searchContact();
    },
  },
  methods: {
    async loadAllContacts() {
      this.isLoading = true;
      this.errorMsg = null;
      try {
        const response = await contactService.getAllContacts();
        this.listOfContacts = response;
        this.isLoading = false;
      } catch (err) {
        alert(err);
        this.errorMsg = err;
      }
    },
    searchContact() {
      if (!this.txtSearch) {
        this.loadAllContacts();
      }
      const filteredContact = this.listOfContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(this.txtSearch.toLowerCase()) ||
          contact.mobile.toString().includes(this.txtSearch) ||
          contact.nickname
            .toLowerCase()
            .includes(this.txtSearch.toLowerCase()) ||
          contact.email
            .toLowerCase()
            .toString()
            .includes(this.txtSearch.toLowerCase()) ||
          contact.birthday.includes(this.txtSearch) ||
          contact.group.toLowerCase().includes(this.txtSearch.toLowerCase())
      );
      this.listOfContacts = filteredContact;
    },
    async deleteContact(id) {
      this.errorMsg = null;
      if (confirm('Are you sure you want to delete this contact?')) {
        try {
          const status = await contactService.deleteContact(id);
          alert(status);
          this.loadAllContacts();
        } catch (err) {
          this.errorMsg = err;
        }
      }
    },
  },
};
</script>
