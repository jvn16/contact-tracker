import axios from 'axios';

export class contactService {
  static firebaseURL =
    'https://vue-contact-tracker-default-rtdb.asia-southeast1.firebasedatabase.app/';

  static async getAllContacts() {
    const response = await axios.get(this.firebaseURL + '/contacts.json');
    const responseData = await response.data;

    if (response.status !== 200) {
      throw new Error('Unable to load all contacts! Please try again later.');
    } else {
      const allContacts = [];

      for (const key in responseData) {
        const contact = {
          id: key,
          name: responseData[key].name,
          nickname: responseData[key].nickname,
          photoURL: responseData[key].photoURL,
          email: responseData[key].email,
          mobile: responseData[key].mobile,
          birthday: responseData[key].birthday,
          group: responseData[key].group,
        };
        allContacts.push(contact);
      }
      return allContacts;
    }
  }

  static async getContact(id) {
    const response = await axios.get(
      this.firebaseURL + '/contacts/' + id + '.json'
    );
    const responseData = await response.data;

    if (response.status !== 200) {
      throw new Error(
        'Unable to view the selected contact! Please try again later.'
      );
    }

    return responseData;
  }

  static async addNewContact(formData) {
    const response = await axios.post(
      this.firebaseURL + '/contacts.json',
      formData
    );

    if (response.status !== 200) {
      throw new Error('Unable to create new contact! Please try again later.');
    } else {
      return 'Contact has been created!';
    }
  }

  static async updateContact(id, formData) {
    const response = await axios.put(
      this.firebaseURL + '/contacts/' + id + '.json',
      formData
    );

    if (response.status !== 200) {
      throw new Error(
        'Unable to update the selected contact! please try again later.'
      );
    } else {
      return 'Contact has been successfully updated!';
    }
  }

  static async deleteContact(id) {
    const response = await axios.delete(
      this.firebaseURL + '/contacts/' + id + '.json'
    );

    if (response.status !== 200) {
      throw new Error('Unable to delete this contact! Please try again later.');
    } else {
      return 'Contact has been successfully deleted!';
    }
  }
}
