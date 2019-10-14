<template>
  <div id="posts">
    <v-app-bar
        app
        clipped-left
        color="amber"
    >
      <span class="title ml-3 mr-5">My <span class="font-weight-light">Blog</span></span>
      <v-text-field
          solo-inverted
          v-model="search"
          flat
          hide-details
          label="Search"
      ></v-text-field>
      <div class="flex-grow-1"></div>
    </v-app-bar>
    <v-content v-show="!loading">
      <v-container
          fluid
          class="grey lighten-4 fill-height"
      >
        <v-row
            justify="center"
            align="center"
        >
          <v-col cols="4" v-for="post in posts" :key="post.id">
            <v-card
                class="mx-auto clickable"
                color="#26c6da"
                dark
                max-width="400"
                @click.native="getPost(post.id)"
            >
              <v-card-title class="headline font-weight-bold">
                {{ post.title }}
              </v-card-title>
              <v-card-subtitle class="headline font-weight-bold">
                {{ truncate(post.body, 5) }}
              </v-card-subtitle>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-avatar color="grey darken-3">
                    <v-img
                        class="elevation-6"
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Joel Medeiros</v-list-item-title>
                  </v-list-item-content>
                  <v-row
                      align="right"
                      justify="end"
                  >
                    <span class="subheading mr-2">{{ prettyDate(post.created_at) }}</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <div class="text-center">
      <v-dialog v-model="dialog.active" class="show" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar dark color="primary" v-if="post">
          <v-btn icon dark @click="dialog.active = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card v-if="post" outlined class="mx-auto" justify="left">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{ prettyDate(post.createdAt)}}</div>
              <v-list-item-title class="headline mb-1">{{ post.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ post.body }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Post",
    data: () => ({
      posts: Array,
      search: null,
      loading: true,
      previousRequest: null,
      post: null,
      dialog: {
        loading: false,
        active: false
      }
    }),
    methods: {
      getList() {
        this.$http
            .get('post' + (this.search ? '?q=' + this.search : ''), {
              before(request) {
                if (this.previousRequest) {
                  this.previousRequest.abort();
                }
                this.previousRequest = request;
              }
            })
            .then(response => {
              this.posts = response.body.data;
              this.loading = false
            })
      },
      getPost(id) {
        this.$http
            .get('post/' + id, {
              before(request) {
                if (this.previousRequest) {
                  this.previousRequest.abort();
                }
                this.previousRequest = request;
              }
            })
            .then(response => {
              this.post = response.body.data;
            });
        this.dialog.active = 'on';
        this.dialog.loading = true;
      },
      truncate(str, no_words) {
        return str.split(" ").splice(0, no_words).join(" ") + ' ...';
      },
      prettyDate(inputFormat) {
        function pad(s) {
          return (s < 10) ? '0' + s : s;
        }

        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
      }
    },
    watch: {
      search: function () {
        this.getList()
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style>
  .clickable {
    cursor: pointer;
  }
  .show{
    display: block;
  }
</style>