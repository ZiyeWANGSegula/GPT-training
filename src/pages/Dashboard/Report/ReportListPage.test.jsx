import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react'
import ReportListPage from './ReportListPage';
import { MemoryRouter } from 'react-router-dom';
import { SnackbarProvider } from "notistack"

describe('ReportEditPage', () => {
    test('renders', () => {
        
        render(
        <SnackbarProvider>
            <MemoryRouter>
                <ReportListPage></ReportListPage>
            </MemoryRouter>
        </SnackbarProvider>)

    })
})