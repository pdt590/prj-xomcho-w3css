import Vue from 'vue'

const fbFilter = value => {
    return formatFb(value);
};

function formatFb(inputLink) {
    let n = inputLink.split("/")
    return n[n.length-1]
}

Vue.filter('fb', fbFilter)