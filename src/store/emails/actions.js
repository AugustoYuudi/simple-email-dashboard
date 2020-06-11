import emails from '../../mock/emails';

async function fetchEmails({ commit }) {
  // fetch emails from api
  commit('setEmails', emails);
}

export default {
  fetchEmails,
};
