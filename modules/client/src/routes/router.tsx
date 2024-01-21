import React from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { ErrorPage } from './error-page'
import { LandingPage } from './landing'
import { ProjectDirectoryPage } from './project-directory'
import { ProjectDetailPage } from './project-details'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <LandingPage />,
      },
      {
        path: 'projects',
        element: <ProjectDirectoryPage />,
      },
      {
        path: 'projects/:id',
        element: <ProjectDetailPage />,
      },
    ],
  },
])
