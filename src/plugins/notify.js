import {useQuasar} from "quasar";

const useNotify = () => {

  const $q = useQuasar();

  const show = ({message, type, timeout = 3000}) => {
    if(['success','error'].includes(type)){
      const value = {
        progress: true,
        position: "top",
        caption: message,
      }
      let property = {
        message: 'Success',
        color: 'positive',
        icon: 'check_circle'
      }

      if(type === 'error'){
        property = {
          message: 'Failed',
          color: 'negative',
          icon: 'cancel'
        }
      }
      return $q.notify({
        ...value,
        ...property,
        timeout
      })
    }
  }

  return {
    show
  }
}

export default useNotify;
