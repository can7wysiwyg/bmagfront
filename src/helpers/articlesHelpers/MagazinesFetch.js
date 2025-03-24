import axios from "axios";
import { ApiUrl } from "../ApiUrl";
import { retry } from "@reduxjs/toolkit/query";

export async function fetchRecentIssue() {

    try {
        

        const response = await fetch(`${ApiUrl}/magissueroute/show_recent_issue`)

        if(!response.ok) {
            console.log("something went wrong while fetching the recent magazine issue")
        }

        return await response.json()
        
    } catch (error) {
        console.log("error fetching recent magazine issue", error)
    
        return { error: true, message: error.message }
       
        
    }

}


export async function fetchAllMags() {

    try {
        
 const response = await fetch(`${ApiUrl}/magissueroute/show_all_issues`)

 if(!response.ok) {
    console.log("there was a problem fetching magazines")
 }

 return await response.json()

    } catch (error) {

        console.log("error fetching recent magazine issue", error)
    
        return { error: true, message: error.message }
       
        
    }
    
}


export async function fetchMagSingle(id) {

    try {
        const response = await fetch(`${ApiUrl}/magissueroute/show_issue_single/${id}`)

        if(!response.ok) {
            console.log("there was a problem fetching magazine")
         }
        
         return await response.json()
        

        
        
    } catch (error) {
        console.log(`error fetching magazine: ${error}`)
    }
    
}


export async function UserMagSubscribe(data) {
    try {

        const response = await axios.post(`${ApiUrl}/reader_credentials_submit`, data)

        if(!response.ok) {
            console.log("error while subscribing")
        }

        return await response.json()
        
    } catch (error) {
        console.log("error while subscribing", error)
    }
}



export async function UserSubdMagByToken(data) {

    try {
        const response = await fetch(`${ApiUrl}/find_by_token/${data}`)

        if(!response.ok) {
            console.log("problems while fetching subscribed magazine")

        }

        return await response.json()
        
    } catch (error) {
        console.log(`there was a problem fetching this item ${error}`)
    }

}


export async function UserReadSubdMag(data) {
    try {
      const response = await axios.post(`${ApiUrl}/reed_magazine_subscribed`, data);
      
      if(!response.data) {
        console.log("problem fetching item");
      }
      
      return response.data; // Use response.data instead of response.json()
    } catch (error) {
      console.log("there was a problem fetching subscribed magazine", error);
    }
  }