<template>
  <div class="app">
    <main class="form-card">
      <StepperBox :steps="steps" :orientation="'horizontal'"/>


      <form v-if="currentStep === 0" @submit.prevent="nextStep" id="sender-form">
        <h1>Отправитель</h1>

        <div class="fields-grid">
          <InputField
            v-model="form.sender.companyName"
            label="Название компании/организации"
            placeholder="Акционерное общество «Пролетарский прогресс»"
            required
          />
          <PhoneInput
            v-model="form.sender.phone"
            label="Телефон"
            placeholder="+7 (____) ___-__-__"
            required
          />
          <InputField
            v-model="form.sender.email"
            label="E-mail"
            :type="'email'"
            placeholder="info@company.ru"
            required
          />
          <InputField
            v-model="form.sender.role"
            label="Должность/Обращение"
            placeholder="Студент"
            required
          />
          <InputField
            v-model="form.sender.fio"
            label="ФИО отправителя"
            placeholder="Иванов Роман Валерьевич"
            required
          />
        </div>

        <div class="divider"></div>

        <h1>Логотип компании</h1>
        <div class="logo-upload">
          <label class="logo-picker">
            <input
              required
              type="file"
              accept="image/png,image/jpeg,image/gif,image/bmp"
              class="logo-input"
              @change="onLogoChange"
            />
            <span class="logo-picker-text">Выбрать изображение</span>
          </label>
          <img v-if="logoPreview" :src="logoPreview" alt="Предпросмотр логотипа" class="logo-preview" />
        </div>
      </form>


      <form v-if="currentStep === 1" @submit.prevent="nextStep" id="recipient-form">
        <h1>Получатель</h1>
      
        <div class="fields-grid">
          <InputField
            v-model="form.recipient.employeeRole"
            label="Должность/Обращение"
            placeholder="Староста"
            :required="true"
          />
          <InputField
            v-model="form.recipient.companyName"
            label="Компания/Организация"
            placeholder="ООО «Станкин»"
            :required="true"
          />
          <InputField
            v-model="form.recipient.fio"
            label="ФИО получателя"
            placeholder="Петров Петр Викторович"
            required
          />

          <div class="radio-group">
            <p class="section-label">Пол</p>
            <Radio
              :checked="form.recipient.sex == 'male'"
              @click="form.recipient.sex = 'male'"
              v-model="form.recipient.sex"
              label="Мужской"
              required
            />
            <Radio
              :checked="form.recipient.sex == 'female'"
              @click="form.recipient.sex = 'female'"
              v-model="form.recipient.sex"
              label="Женский"
              required
            />
          </div>
        </div>
      </form>


      <form v-if="currentStep === 2" @submit.prevent="nextStep" id="letter-form">
        <h1>Письмо</h1>

        <InputField
          v-model="form.subject"
          label="Тема письма"
          placeholder="О Лабе"
          :required="true"
          style="margin-bottom: 16px;"
        />

        <Textarea
          v-model="form.content"
          label="Содержание письма"
          placeholder="Хочу сдать лабораторные на пятёрку"
          :rows="5"
          :required="true"
        />
      </form>

      <form v-if="currentStep === 3" @submit.prevent="generateDocument" id="attachments-form">
        <h1>Приложения</h1>
        <button type="button" class="add-new-attachment" @click="modalNewAttachment = true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M12 5V19" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Прикрепить
        </button>

        <div class="attachments-list">
          <div class="attachments-item" v-for="(attachment, index) in form.attachments" :key="index">
            <p class="attachments-item-title">{{ attachment.title }}</p>
            <p class="attachments-item-text">{{ attachment.text }}</p>
            <p class="attachments-item-pages">{{ attachment.pages }} стр.</p>
          </div>
        </div>
      </form>
      

      <div class="button-container">
        <ButtonComponent
          v-if="currentStep > 0"
          style="width: fit-content;"
          label="Назад"
          :variant="3"
          @click="previousStep"
        />
        <ButtonComponent
          v-if="currentStep === 3"
          style="width: fit-content;"
          label="Сгенерировать"
          :isLoading="isGenerating"
          :disabled="!isFormValid"
          :type="'submit'"
          :form="'attachments-form'"
        />
        <ButtonComponent
          v-else
          style="width: fit-content;"
          label="Далее"
          :type="'submit'"
          :disabled="!isFormValid"
          :form="currentStep === 0 ? 'sender-form' : currentStep === 1 ? 'recipient-form' : currentStep === 2 ? 'letter-form' : 'attachments-form'"
        />
      </div>
    </main>



    <Modal :isOpen=" modalNewAttachment" @close="modalNewAttachment = false" :title="'Новое приложение'" :width="'400px'">
      <template #content>
        <form id="new-attachment-form" style="width: 100%; display: flex; flex-direction: column; gap: 10px;" @submit.prevent="addNewAttachment">
          <InputField :label="'Название'" :required="true" :type="'text'" :placeholder="'Например: Лабораторная работа 1'" v-model="newAttachment.title"/>
          <Textarea v-model="newAttachment.text" label="Описание" placeholder="Текст приложения" :rows="5" :required="true" />
          <CounterBox v-model="newAttachment.pages" label="Количество страниц" :min="1" :max="10" :step="1" />
        </form>
      </template>
      <template #footer>
        <ButtonComponent style="width: fit-content;" :variant="3" :label="'Отмена'" @click="modalNewAttachment=false"/>
        <ButtonComponent style="width: fit-content;" :variant="1" :label="'Прикрепить'" :isLoading="false" :form="'new-attachment-form'" :type="'submit'"/>
      </template>
    </Modal>
  </div>
</template>

<script>
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  ImageRun,
  Packer,
  Paragraph,
  SectionType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  UnderlineType,
  WidthType,
} from 'docx'
import { saveAs } from 'file-saver'

const FONT_SIZE = 28

const NO_BORDER = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: 'auto' },
}

export default {
  name: 'App',
  data() {
    return {
      isGenerating: false,
      logoPreview: null,
      logoBuffer: null,
      logoType: 'png',
      logoMimeType: 'image/png',
      logoDimensions: { width: 180, height: 100 },
      steps: [
        { label: 'Отправитель', completed: false },
        { label: 'Получатель', completed: false },
        { label: 'Письмо', completed: false },
        { label: 'Приложения', completed: false },
      ],
      currentStep: 0,
      form: {
        recipient: {
          employeeRole: '',
          companyName: '',
          fio: '',
          sex: 'male',
        },
        sender: {
          companyName: '',
          phone: '',
          email: '',
          role: '',
          fio: '',
        },
        subject: '',
        content: '',
        attachments: [],
      },

      modalNewAttachment: false,

      newAttachment: {
        title: '',
        text: '',
        pages: 1,
      },
    }
  },
  computed: {
    isFormValid() {
      if (this.currentStep === 0) {
        return this.form.sender.companyName.trim().length > 0 && this.form.sender.phone.trim().length == 18 && this.form.sender.email.trim().length > 0 && this.form.sender.role.trim().length > 0 && this.form.sender.fio.trim().length > 0 && this.logoPreview
      }
      if (this.currentStep === 1) {
        return this.form.recipient.employeeRole.trim().length > 0 && this.form.recipient.companyName.trim().length > 0 && this.form.recipient.fio.trim().length > 0
      }
      if (this.currentStep === 2) {
        return this.form.subject.trim().length > 0 && this.form.content.trim().length > 0
      }
      if (this.currentStep === 3) {
        return true
      }
    },
    shortCompanyName() {
      const companyName = this.form.sender.companyName
      const match = companyName.match(/«([^»]+)»/)
      if (match) {
        return `(АО «${match[1]}»)`
      }
      return `(${companyName})`
    },
    recipientLines() {
      const { employeeRole, companyName, fio } = this.form.recipient
      return [employeeRole, companyName, fio]
        .map((line) => line.trim())
        .filter(Boolean)
    },
    recipientName() {
      return this.form.recipient.fio.trim()
    },
    formattedDate() {
      const date = new Date()
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}.${month}.${year}`
    },
  },
  methods: {
    addNewAttachment() {
      this.form.attachments.push({
        title: this.newAttachment.title.trim(),
        text: this.newAttachment.text.trim(),
        pages: this.newAttachment.pages,
      })
      this.modalNewAttachment = false
      this.newAttachment = {
        title: '',
        text: '',
        pages: 1,
      }
    },
    previousStep() {
      this.currentStep--
      this.steps[this.currentStep].completed = false
    },
    nextStep() {
      this.currentStep++
      this.steps[this.currentStep - 1].completed = true
    },
    onStepCompleted(step) {
      this.steps[step].completed = true
      this.currentStep = step
    },
    onLogoChange(event) {
      const file = event.target.files?.[0]
      if (!file) {
        return
      }

      if (this.logoPreview) {
        URL.revokeObjectURL(this.logoPreview)
      }

      this.logoPreview = URL.createObjectURL(file)
      this.logoMimeType = file.type || 'image/png'
      this.logoType = this.resolveImageType(file)

      const reader = new FileReader()
      reader.onload = (loadEvent) => {
        this.logoBuffer = loadEvent.target.result
      }
      reader.readAsArrayBuffer(file)
    },
    resolveImageType(file) {
      if (file.type.includes('jpeg') || file.type.includes('jpg')) {
        return 'jpg'
      }
      if (file.type.includes('gif')) {
        return 'gif'
      }
      if (file.type.includes('bmp')) {
        return 'bmp'
      }
      return 'png'
    },
    centeredParagraph(text, options = {}) {
      return new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: options.spacing ?? { after: 80 },
        children: [
          new TextRun({
            text,
            size: options.size ?? FONT_SIZE,
            font: 'Times New Roman',
          }),
        ],
      })
    },
    leftParagraph(text, options = {}) {
      return new Paragraph({
        alignment: options.alignment ?? AlignmentType.LEFT,
        spacing: options.spacing ?? { after: 120 },
        children: [
          new TextRun({
            text,
            size: options.size ?? FONT_SIZE,
            font: 'Times New Roman',
            bold: options.bold ?? false,
          }),
        ],
      })
    },
    async getImageDimensions(buffer, mimeType) {
      return new Promise((resolve) => {
        const blob = new Blob([buffer], { type: mimeType })
        const url = URL.createObjectURL(blob)
        const image = new Image()

        image.onload = () => {
          const maxWidth = 180
          const ratio = image.height / image.width || 1
          resolve({
            width: maxWidth,
            height: Math.max(40, Math.round(maxWidth * ratio)),
          })
          URL.revokeObjectURL(url)
        }

        image.onerror = () => {
          resolve({ width: 180, height: 100 })
          URL.revokeObjectURL(url)
        }

        image.src = url
      })
    },
    buildHeaderChildren() {
      const children = []

      if (this.logoBuffer) {
        children.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new ImageRun({
                type: this.logoType,
                data: new Uint8Array(this.logoBuffer),
                transformation: this.logoDimensions,
              }),
            ],
          }),
        )
      }

      children.push(
        this.centeredParagraph(this.form.sender.companyName.trim()),
        this.centeredParagraph(this.shortCompanyName),
        this.centeredParagraph(`Телефон ${this.form.sender.phone.trim()}`),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: `E-mail: ${this.form.sender.email.trim()}`,
              size: FONT_SIZE,
              font: 'Times New Roman',
              underline: { type: UnderlineType.SINGLE },
            }),
          ],
        }),
      )

      return children
    },
    buildReferenceTable() {
      const recipientParagraphs = this.recipientLines.map(
        (line, index) =>
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { after: index === this.recipientLines.length - 1 ? 0 : 60 },
            children: [
              new TextRun({
                text: line,
                size: FONT_SIZE,
                font: 'Times New Roman',
              }),
            ],
          }),
      )

      return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: NO_BORDER,
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 55, type: WidthType.PERCENTAGE },
                borders: NO_BORDER,
                children: [
                  this.leftParagraph(`От ${this.formattedDate}`, { spacing: { after: 80 } }),
                ],
              }),
              new TableCell({
                width: { size: 45, type: WidthType.PERCENTAGE },
                borders: NO_BORDER,
                children: recipientParagraphs,
              }),
            ],
          }),
        ],
      })
    },
    buildSignatureTable() {
      return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: NO_BORDER,
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                borders: NO_BORDER,
                children: [
                  this.leftParagraph(this.form.sender.role.trim(), { spacing: { after: 120 } }),
                ],
              }),
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                borders: NO_BORDER,
                children: [
                  this.leftParagraph(this.form.sender.fio.trim(), {
                    alignment: AlignmentType.RIGHT,
                    spacing: { after: 120 },
                  }),
                ],
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: NO_BORDER,
                children: [this.leftParagraph('Подпись ______________', { spacing: { after: 0 } })],
              }),
              new TableCell({
                borders: NO_BORDER,
                children: [new Paragraph({ text: '' })],
              }),
            ],
          }),
        ],
      })
    },
    buildAttachmentsListInBody() {
      if (!this.form.attachments.length) {
        return []
      }

      const paragraphs = [
        this.leftParagraph('Приложение:', { spacing: { before: 240, after: 120 } }),
      ]

      this.form.attachments.forEach((attachment, index) => {
        const pagesSuffix = attachment.pages ? ` на ${attachment.pages} л.` : ''
        paragraphs.push(
          this.leftParagraph(
            `${index + 1}. ${attachment.title.trim()}${pagesSuffix}`,
            { spacing: { after: 60 } },
          ),
        )
      })

      return paragraphs
    },
    buildAttachmentSectionChildren(attachment, index) {
      const total = this.form.attachments.length
      const label = total === 1 ? 'Приложение' : `Приложение ${index + 1}`

      const children = [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { after: 240 },
          children: [
            new TextRun({
              text: label,
              size: FONT_SIZE,
              font: 'Times New Roman',
            }),
          ],
        }),
        this.centeredParagraph(attachment.title.trim(), { spacing: { after: 240 } }),
      ]

      const textLines = attachment.text.trim().split('\n').map((line) => line.trim()).filter(Boolean)
      if (textLines.length) {
        textLines.forEach((line, lineIndex) => {
          children.push(
            this.leftParagraph(line, {
              spacing: { after: lineIndex === textLines.length - 1 ? 0 : 120 },
            }),
          )
        })
      }

      return children
    },
    buildDocumentSections() {
      const mainSectionChildren = [
        ...this.buildHeaderChildren(),
        this.buildReferenceTable(),
        this.leftParagraph(this.form.subject.trim(), { spacing: { before: 240, after: 240 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
          children: [
            new TextRun({
              text: this.form.recipient.sex == 'male'
                ? `Уважаемый ${this.recipientName},`
                : `Уважаемая ${this.recipientName},`,
              size: FONT_SIZE,
              font: 'Times New Roman',
              bold: true,
            }),
          ],
        }),
        this.leftParagraph(this.form.content.trim()),
        ...this.buildAttachmentsListInBody(),
      ]

      const sections = [{
        footers: {
          default: new Footer({
            children: [this.buildSignatureTable()],
          }),
        },
        children: mainSectionChildren,
      }]

      this.form.attachments.forEach((attachment, index) => {
        sections.push({
          properties: {
            type: SectionType.NEXT_PAGE,
          },
          children: this.buildAttachmentSectionChildren(attachment, index),
        })
      })

      return sections
    },
    async generateDocument() {
      if (!this.isFormValid || this.isGenerating) {
        return
      }

      this.isGenerating = true

      try {
        this.logoDimensions = this.logoBuffer
          ? await this.getImageDimensions(this.logoBuffer, this.logoMimeType)
          : null

        const doc = new Document({
          sections: this.buildDocumentSections(),
        })

        const blob = await Packer.toBlob(doc)
        const mimeType =
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        const docBlob = blob.slice(0, blob.size, mimeType)
        saveAs(docBlob, 'Письмо.docx')
      } catch (error) {
        console.error(error)
        alert('Не удалось сгенерировать документ. Проверьте данные и попробуйте снова.')
      } finally {
        this.isGenerating = false
      }
    },
  },
}
</script>

<style scoped>
.attachments-list{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
}
.attachments-item{
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid var(--color-outline);
}
.attachments-item-title{
  font-size: 14px;
  font-weight: 600;
  color: var(--color-dark-grey);
}
.attachments-item-text{
  font-size: 12px;
  font-weight: 400;
  color: var(--color-light-grey);
}
.attachments-item-pages{
  font-size: 12px;
  font-weight: 400;
  color: var(--color-light-grey);
}
.add-new-attachment:hover{
    background-color: rgba(64, 86, 244, 20%);
    cursor: pointer;
}
.add-new-attachment{
    background-color: rgba(64, 86, 244, 10%);
    font-family: 'Nata Sans';
    border: none;
    color: var(--color-accent);
    font-size: 14px;
    font-weight: 400;
    padding: 10px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    gap: 6px;
}
.radio-group{
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: start;
  grid-area: 4 / 1 / 5 / 3;
}
.button-container{
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: end;
}
.app {
  min-height: 100vh;
  padding: 32px 16px 48px;
}

.header {
  max-width: 760px;
  margin: 0 auto 24px;
  text-align: center;
}

.title {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 700;
}

.subtitle {
  margin: 0;
  color: var(--color-light-grey);
  font-size: 15px;
}

.form-card {
  max-width: 760px;
  margin: 0 auto;
  padding: 28px;
  background-color: transparent;
  box-shadow: 0 0 20px var(--color-shadow-soft);
  border: 1px solid var(--color-shadow-soft);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-label {
  margin: 0 0 10px;
  font-size: 14px;
  color: var(--color-dark-grey);
}

.logo-upload {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.logo-picker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 10px;
  border: 1px dashed var(--color-outline);
  cursor: pointer;
  color: var(--color-accent);
  font-size: 14px;
  font-weight: 600;
  transition: border-color 0.2s ease;
}

.logo-picker:hover {
  border-color: var(--color-accent);
}

.logo-input {
  display: none;
}

.logo-preview {
  max-width: 160px;
  max-height: 100px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid var(--color-outline);
}

.fields-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 640px) {
  .fields-grid {
    grid-template-columns: 1fr;
  }
}
</style>
