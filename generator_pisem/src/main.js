import './assets/base.css'
import { createApp } from 'vue'
import App from './App.vue'

import InputField from "../components/ui/TextField.vue";
import ButtonComponent from "../components/ui/ButtonsComponent.vue";
import Checkbox from "../components/ui/CheckBox.vue";
import Radio from "../components/ui/RadioButton.vue";
import Switch from "../components/ui/SwitchBox.vue";
import Skeleton from "../components/ui/SkeletonLoader.vue";
import Modal from "../components/ui/ModalView.vue"
import ColorPicker from "../components/ui/ColorPicker.vue"
import CounterBox from "../components/ui/CounterBox.vue"
import PhoneInput from "../components/ui/PhoneInput.vue"
import MessageBox from "../components/ui/MessageBox.vue"
import ToolTip from "../components/ui/ToolTip.vue"
import Textarea from "../components/ui/TextArea.vue"
import IconButton from "../components/ui/IconButton.vue"
import Select from "../components/ui/SelectList.vue"
import TabMenu from "../components/ui/TabMenu.vue"
import TableView from "../components/ui/TableView.vue"
import PaginatorBlock from '../components/ui/PaginatorBlock.vue';
import BadgeBox from "../components/ui/BadgeBox.vue"
import StepperBox from "../components/ui/StepperBox.vue"
import Accordion from "../components/ui/AccordionBox.vue"
import SwiperBox from "../components/ui/SwiperBox.vue"

const app = createApp(App)
app.component("InputField", InputField)
app.component("ButtonComponent", ButtonComponent)
app.component("Checkbox", Checkbox)
app.component("Radio", Radio)
app.component("Switch", Switch)
app.component("Skeleton", Skeleton)
app.component("Modal", Modal)
app.component("ColorPicker", ColorPicker)
app.component("CounterBox", CounterBox)
app.component("PhoneInput", PhoneInput)
app.component("MessageBox", MessageBox)
app.component("ToolTip", ToolTip)
app.component("Textarea", Textarea)
app.component("IconButton", IconButton)
app.component("Select", Select)
app.component("TabMenu", TabMenu)
app.component("TableView", TableView)
app.component("PaginatorBlock", PaginatorBlock)
app.component("BadgeBox", BadgeBox)
app.component("StepperBox", StepperBox)
app.component("Accordion", Accordion)
app.component("SwiperBox", SwiperBox)
app.mount('#app')
