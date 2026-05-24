<template>
    <div :class="hasBorder ? 'tableWrapperBordered' : 'tableWrapper'">
        <div class="headerRow">
            <p class="graph-title">{{ title }}</p>
            <button class="showAll" @click="this.$emit('viewAllClicked')" v-if="viewAllButton">Смотреть все</button>
        </div>
        <template v-if="data.tableRows == 0">
            <Skeleton v-for="i in 4" :key="i" style="height: 40px;"/>
        </template>
        <template v-else>
            <div class="tableContainer">
                <div class="tableHeader">
                    <div v-for="el in data.tableHeader" :key="el.id">
                        <p :style="{'flex' : `0 0 ${data.config[data.tableHeader.indexOf(el)]?.width}`, 'width' : `${data.config[data.tableHeader.indexOf(el)]?.width}px`}" class="unit">{{ el }}</p>
                    </div>
                </div>

                <div class="row" v-for="row in data.tableRows" :key="row.id" @click="handleRowClick(row)">
                    <div v-for="el in row" :key="el.id">

                      <div 
                        :style="{'flex' : `0 0 ${data.config[getFieldIndex(row, el)]?.width}`, 'width' : `${data.config[getFieldIndex(row, el)]?.width}px`}" 
                        v-if="data.config[getFieldIndex(row, el)]?.type == 'Goods'" 
                        class="goods"
                      >
                        <div 
                          class="good" 
                          v-for="good in el.slice(0, 3)" 
                          :key="good.id"
                          :style="{'background-image': `url(${good.photo})`}"
                        ></div>
                        <div 
                          v-if="el.length > 3" 
                          class="good good-counter"
                        >
                          <span>+{{ el.length - 3 }}</span>
                        </div>
                      </div>

                        <p v-else :style="{'flex' : `0 0 ${data.config[getFieldIndex(row, el)]?.width}`, 'width' : `${data.config[getFieldIndex(row, el)]?.width}px`}" class="unit">{{ el }}</p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'TableView',
    props: {
        title: String,
        viewAllButton: Boolean,
        data: Object,
        hasBorder: Boolean
    },
    methods:{
        getFieldIndex(row, fieldValue) {
            const keys = Object.keys(row);
            const values = Object.values(row);
            return values.indexOf(fieldValue);
        },
        handleRowClick(row) {
          const firstFieldValue = Object.values(row)[0]

          this.$emit('rowSelected', firstFieldValue)
        }
    }
}
</script>

<style scoped>
.showAll:hover{
  filter: brightness(80%);
  cursor: pointer;
}
.showAll{
  background: none;
  border: none;
  color: var(--color-accent);
  text-decoration: underline;
  font-family: 'Nata Sans';
  margin: 0;
  padding: 0;
  font-size: 10px;
}
.headerRow{
    display: flex;
    align-items: center;
    gap: 10px;
}
.good{
  border-radius: 5px;
  background-color: var(--color-background);
  width: 36px;
  aspect-ratio: 1;
  background-size: cover;
  background-position: center;
}
.good-counter{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  color: var(--color-dark-grey);
  font-size: 10px;
  font-weight: 600;
}
.good-counter span{
  line-height: 1;
}
.goods{
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  min-width: 0;
}
.unit{
  color: var(--color-dark-grey);
  font-size: 12px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.row:hover{
  border: 1px solid var(--color-outline);
}
.row .unit{
  color: var(--color-light-grey);
}
.row{
  height: 30px;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  gap: 30px;
  min-width: fit-content;
  max-width: 100%;
}
.tableHeader{
  border: 1px solid var(--color-background);
  background-color: var(--color-background);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  gap: 30px;
  min-width: fit-content;
  max-width: 100%;
}
.tableContainer{
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: scroll;
  padding-bottom: 10px;
}
.tableWrapperBordered{
  position: relative;
  background-color: transparent;
  box-shadow: 0 0 20px var(--color-shadow-soft);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: fit-content;
}
.tableWrapper{
  position: relative;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: fit-content;
}
</style>