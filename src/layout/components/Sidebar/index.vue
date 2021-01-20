<template>
  <!-- :class="{'has-logo':showLogo}" -->
  <div>
    <logo v-if="showLogo" :collapse="isCollapse" />
    <p v-show="showHeaderPicture != null" class="titleName" @click="toAccount">
      <span style="display:inline-block" v-show="showHeaderPicture == false">
          <img style="display:inline-block;vertical-align:middle;margin-right:10px;" class="headerImg" :src="headerPicture" :title="headerPicture">
          <span style="display:inline-block;vertical-align:middle;">{{ username }}</span>
      </span>
      <img v-show="showHeaderPicture == true" class="headerImg" :src="headerPicture" :title="headerPicture">
    </p>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Logo from './Logo'
import Bus from '@/eventBus'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { getLocal } from '@/utils/auth'
export default {
    components: { SidebarItem },
    data() {
        return {
            username: '',
            userImg: '',
            // navbar: this.$api.navBarWidth,
            showHeaderPicture: false,
            headerPicture: ''
        }
    },
    // watch: {
    //     navbar(curVal, oldVal) {
    //         console.log(curVal, oldVal)
    //     }
    // },
    mounted() {
        this.getUser()
        if (document.getElementsByClassName('sidebar-container')[0].offsetWidth === 210) {
            this.showHeaderPicture = false
        } else if (document.getElementsByClassName('sidebar-container')[0].offsetWidth === 54) {
            this.showHeaderPicture = true
        }
        Bus.$on('navBarWidth', data => {
            if (data.navBarWidth === false) {
                this.showHeaderPicture = true
            } else if (data.navBarWidth === true) {
                this.showHeaderPicture = false
            } else {
                this.showHeaderPicture = null
            }
        })
    },
    computed: {
        ...mapGetters(['sidebar']),
        routes() {
            return this.$router.options.routes
        },
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo
        },
        variables() {
            return variables
        },
        isCollapse() {
            return !this.sidebar.opened
        }
    },
    methods: {
        getUser() {
            this.username = getLocal('teacinfo').nickName
            // this.username = getLocal('teacinfo').nickName
            if (this.headerPicture.indexOf('http') === -1 || this.headerPicture.indexOf('https') === -1) {
                this.headerPicture = this.$api.redirectURL + getLocal('teacinfo').thumb
            } else {
                this.headerPicture = getLocal('teacinfo').thumb
            }
        },
        toAccount() {
            this.$router.push({ path: '/account/myinfonamtion' })
        }
    }
}
</script>
<style>
.titleName {
    cursor: pointer;
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center;
    width: 100%;
    font-size: 14px;
    margin: 0;
    margin-top:5px;
}
.headerImg{
    width: 35px;
    height:35px;
    border-radius: 50%;
}
</style>
