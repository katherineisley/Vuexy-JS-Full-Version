<script setup>
import {
  alignment,
  basic,
  basicPill,
  customIcons,
  dynamic,
  fixed,
  grow,
  pagination,
  programmaticNavigation,
  stacked,
  vertical,
  verticalPill,
} from '@/views/demos/components/tabs/demoCodeTabs'
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Basic -->
      <AppCardCode
        title="Basic"
        variant="outlined"
        :code="basic"
      >
        <p>The <code>v-tabs</code> component is used for hiding content behind a selectable item.</p>

        <DemoTabsBasic />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Stacked -->
      <AppCardCode
        title="Stacked"
        variant="outlined"
        :code="stacked"
      >
        <p>Using <code>stacked</code> prop you can have buttons that use both icons and text.</p>

        <DemoTabsStacked />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Vertical -->
      <AppCardCode
        title="Vertical"
        variant="outlined"
        :code="vertical"
      >
        <p>The <code>vertical</code> prop allows for <code>v-tab</code> components to stack vertically.</p>

        <DemoTabsVertical />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Alignment -->
      <AppCardCode
        title="Alignment"
        variant="outlined"
        :code="alignment"
      >
        <p>Use <code>align-tabs</code> prop to change the tabs alignment.</p>

        <DemoTabsAlignment />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Pagination -->
      <AppCardCode
        title="Pagination"
        variant="outlined"
        :code="pagination"
      >
        <p>If the tab items overflow their container, pagination controls will appear on desktop.</p>

        <DemoTabsPagination />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Custom Icons -->
      <AppCardCode
        title="Custom Icons"
        variant="outlined"
        :code="customIcons"
      >
        <p><code>prev-icon</code> and <code>next-icon</code> props can be used for applying custom pagination icons.</p>

        <DemoTabsCustomIcons />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Fixed tabs -->
      <AppCardCode
        title="Fixed"
        variant="outlined"
        :code="fixed"
      >
        <p>The <code>fixed-tabs</code> prop forces <code>v-tab</code> to take up all available space up to the maximum width (300px).</p>

        <DemoTabsFixed />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Grow -->
      <AppCardCode
        title="Grow"
        variant="outlined"
        :code="grow"
      >
        <p>The <code>grow</code> prop will make the tab items take up all available space with no limit.</p>

        <DemoTabsGrow />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Programmatic Navigation -->
      <AppCardCode
        title="Programmatic Navigation"
        variant="outlined"
        :code="programmaticNavigation"
      >
        <DemoTabsProgrammaticNavigation />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Dynamic Tabs -->
      <AppCardCode
        title="Dynamic"
        variant="outlined"
        :code="dynamic"
      >
        <p>Tabs can be dynamically added and removed. This allows you to update to any number and the <code>v-tabs</code> component will react.</p>

        <DemoTabsDynamic />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Basic Pill -->
      <AppCardCode
        title="Basic Pill"
        variant="outlined"
        :code="basicPill"
      >
        <p>Use our custom class <code>.v-tabs-pill</code> along with <code>v-tabs</code> component to style pill tabs.</p>

        <DemoTabsBasicPill />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Vertical Pill -->
      <AppCardCode
        title="Vertical Pill"
        variant="outlined"
        :code="verticalPill"
      >
        <p>Use our custom class .v-tabs-pill along with v-tabs component to style pill tabs.</p>

        <DemoTabsVerticalPill />
      </AppCardCode>
    </VCol>
  </VRow>
</template>
