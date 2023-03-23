import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react'
import ReportCreatePage from './ReportCreatePage';
import { MemoryRouter } from 'react-router-dom';
import { SnackbarProvider } from "notistack"

describe('ReportCreatePage', () => {
    test('renders', () => {
        
        render(
        <SnackbarProvider>
            <MemoryRouter>
                <ReportCreatePage></ReportCreatePage>
            </MemoryRouter>
        </SnackbarProvider>)
    })
})