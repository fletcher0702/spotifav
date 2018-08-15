const ACCESS_TOKEN = 'BQDny4tTmJyHp9h4XTR9KfroLs1eBIhy2VIwBWhfrUJyIte_sIBQCFGmxuDxyL4WoP1-gAHNSNryDiFeW_QlTedcZz4efnbr0m37Pa0dJtq861E4zfc1WkrGx-FNIoymuqY-hvEzNeBKziT6iiWmWRn0teNM9pmcJef3Exrcr_1G3Jnb0w&refresh_token=AQC6f41UU_WerMg0w10vERBhasG0m8U5JuVeysCOPTT_-AsznvDv37c9brNohU4weNizQXGqpw6CyY9CaZoFmt-fpuptLHX1_joOYoHrbJZ9uEvcbU4ng-rL33GTtBKzVCw';
const clientIdSpotify = '3a18c1d683fa4000a40f7f2e407d5485';
const clientSecretSpotify = '4fa3145775344d62b7687748d0ae3c8f';

export default {

  accessToken: ACCESS_TOKEN,
  clientId: clientIdSpotify,
  clientSecret: clientSecretSpotify,
};

export const spotifyApiConfig = {
  clientId: clientIdSpotify,
  clientSecret: clientSecretSpotify,
  redirectUri: 'http://localhost:8888/callback/',
}
