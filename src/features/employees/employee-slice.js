import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Server URL
const API_URL = "http://localhost:4000/api/v1/auth";