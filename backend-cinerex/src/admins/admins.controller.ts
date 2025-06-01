
import { Controller, Get, Patch, Param, Delete, NotFoundException, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admins.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from '../auth/guards/auth.guard';  
import { RolesGuard } from '../auth/guards/roles.guard'; 
import { Roles } from '../auth/decorators/roles.decorator'; 
@Controller('admins')
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    const admin = await this.adminService.findByEmail(email);
    if (!admin) {
      throw new NotFoundException('Administrador no encontrado');
    }
    return admin;
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(email, updateAdminDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.adminService.remove(email);
  }
}

