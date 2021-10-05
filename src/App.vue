<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<script lang="js">
import {defineComponent, inject} from "vue";
import { io } from 'socket.io-client';
import {ServerEvent} from "@/interfaces/server.event.interface";
import { API_URL } from "@/app.consts";
import { StateDto } from "@/dto/state.dto";
export default defineComponent({
  data() {
    return {
      connection: null,
      // eslint-disable-next-line no-undef
      emitter: inject('emitter'),
    }
  },
  methods: {
    navigateToState(state) {
      switch(state) {
        case 'initial':
          this.$router.push('/welcome');
          break;
        case 'quiz':
          this.$router.push('/quiz');
          break;
        default:
          break
      }
    },
    async getState() {
      return (await this.axios.get(`${API_URL}/state/main`)).data
    }
  },
  created() {
    this.getState().then((res) => {
      this.navigateToState(res.value);
    })
    this.emitter = inject('emitter');
    this.axios.get(API_URL).then(r => {
      console.log(r);
    })
    this.connection = io(API_URL);
    this.connection.on('connect', () => {
      console.log('Connected');
      this.connection.emit('events', {test: 'test'});
      this.connection.emit('identity', 0, (response) =>  {
            console.log('Identity:', response)
        }
    );
    });
    this.connection.on('events', (data) => {
      // console.log(data);
      this.emitter.emit('serverEvent',data);
    });
    this.connection.on('exception', function (data) {
      console.log('event', data);
    });
    this.connection.on('disconnect', function () {
      console.log('Disconnected');
    });
    this.emitter.on('serverEvent', (data) => {
      console.log(`serverEvent`);
      console.log(data);
      if(!data) {
        return;
      }
      if(data.event === 'photos_update') {
        // do photos update;
      }
      if(data.event === 'state_changed') {

          this.navigateToState(data.data.value)
      }
    })
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
