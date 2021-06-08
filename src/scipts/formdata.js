var MyFormData = {};

MyFormData.install = function(Vue) {
    Vue.prototype.$form_data = {
        generate: function(data){
            const form = new FormData();
            for (let key in data){
                form.append(key,data[key]);
            }
            return form;
        }
    }
};

module.exports = MyFormData;