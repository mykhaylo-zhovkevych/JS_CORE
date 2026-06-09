### Content index:
| Level | Topic                                 | Main idea                                                                |
|-------| ------------------------------------- | ------------------------------------------------------------------------ |
| 1     | What pagination means in frontend     | Splitting a long list into smaller visible parts                         |
| 2     | What indexing means                   | Calculating positions: first item, last item, current page, row number   |
| 3     | Vue pagination state                  | `currentPage`, `pageSize`, `totalPages`, `paginatedItems`                |
| 4     | Filtering and sorting with pagination | Why pagination must react to filtered/sorted data                        |
| 5     | Common frontend mistakes              | Wrong keys, off-by-one errors, empty pages                               |
| 6     | Advanced frontend pagination          | URL sync, infinite scroll, virtual scrolling, caching, accessibility     |

#### What is pagination?
``` txt
Pagination means: Instead of showing all items at once, you divide them into pages.
100 ids
10 ids per page
therefor 10 pages
```
Indexing for pagination
``` js
startIndex = (currentPage - 1) * pageSize
endIndex = smartIndex + pageSize
visibleItems = items.slice(startIndex, endIndex)
```


Code example
https://play.vuejs.org/
``` vue
<script setup lang="ts">
import { computed, ref } from "vue"

interface User {
    id: number;
    name: string;
}

const users = ref<User[]>([
{id: 1, name: test01}
{id: 2, name: test02}
{id: 3, name: test03}
{id: 4, name: test04}
{id: 5, name: test05}
{id: 6, name: test06}
{id: 7, name: test07}
{id: 8, name: test08}
{id: 9, name: test09}
])

const currentPage = ref(1)
const pageSize = ref(4)

const totalPage = computed(() => {
    return Math.ceil(users.value.length / pageSize.value)
})

const startIndex = computed(() => {
    return (currentPage.value - 1) * pageSize.value
})
const endIndex = computed(() => {
    return startIndex.value + pageSize.value
})

// Holds data
const export paginatedUsers = computed(() => {
    return users.slice(startIndex.value, endIndex.value)
})

function goToPreviousPage() {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

function goToNextPage() {
    if (currentPage.value < totalPage.value) {
        currentPage.value++
    }
}

function getAbsoluteIndex(localIndex: number) {
    return startIndex.value + localIndex + 1;
} 

</script>
```

``` html
<template>
  <section class="users-page">
    <h2>Users</h2>

    <ul>
      <li
        v-for="(user, localIndex) in paginatedUsers" :key="user.id"> {{ getAbsoluteIndex(localIndex) }} | {{ user.name }} </li>
    </ul>

    <div class="pagination">
      <button @click="goToPreviousPage" :disabled="currentPage === 1" >
        Previous
      </button>


      <button @click="goToNextPage" :disabled="currentPage === totalPages" >
        Next
      </button>
    </div>

    <p>
      Page {{ currentPage }} of {{ totalPages }}
    </p>
  </section>
</template>
``` 

``` css
<style scoped>
.pagination {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.active {
  font-weight: bold;
  border: 2px solid black;
}
</style>
```
