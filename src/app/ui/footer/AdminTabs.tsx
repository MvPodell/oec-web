"use client";
import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styles from "@/app/ui/footer/adminTabs.module.scss";
import { EventForm } from "../forms/EventForm";
import { StaffForm } from "../forms/StaffForm";
import { TripForm } from "../forms/TripForm";
import { CarouselForm } from "../forms/CarouselForm";

type adminTabsProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminTabs: React.FC<adminTabsProps> = ({setOpen}) => {
  return (
    <div>
      <Tabs.Root className={styles.TabsRoot} defaultValue="tab1">
        <Tabs.List className={styles.TabsList} aria-label="Manage your account">
          <Tabs.Trigger className={styles.TabsTrigger} value="tab1">
            Carousel
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.TabsTrigger} value="tab2">
            Event
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.TabsTrigger} value="tab3">
            Staff
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.TabsTrigger} value="tab4">
            Trip
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className={styles.TabsContent} value="tab1">
          <CarouselForm setOpen={setOpen} /> 
        </Tabs.Content>
        <Tabs.Content className={styles.TabsContent} value="tab2">
          <EventForm setOpen={setOpen} />
        </Tabs.Content>
        <Tabs.Content className={styles.TabsContent} value="tab3">
          <StaffForm setOpen={setOpen} />
        </Tabs.Content>
        <Tabs.Content className={styles.TabsContent} value="tab4">
          <TripForm setOpen={setOpen}/>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
